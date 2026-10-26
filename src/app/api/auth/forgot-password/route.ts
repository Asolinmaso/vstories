import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

import { supabaseAdmin } from "@/lib/supabase";
import { sendEmail } from "@/lib/email";
import { isMailConfigured } from "@/lib/mailer";
import { validatePasswordField } from "@/lib/auth-validation";

const OTP_COOKIE = "vstories_password_reset";
const OTP_EXPIRY_MINUTES = 10;

function createToken(
    data: Record<string, string | number | boolean>
) {
    const payload = Buffer.from(JSON.stringify(data)).toString("base64url");

    const signature = crypto
        .createHmac("sha256", process.env.SUPABASE_SERVICE_ROLE_KEY || "vstories-reset")
        .update(payload)
        .digest("base64url");

    return `${payload}.${signature}`;
}

function verifyToken(token: string) {
    try {
        const [payload, signature] = token.split(".");

        if (!payload || !signature) return null;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.SUPABASE_SERVICE_ROLE_KEY || "vstories-reset"
            )
            .update(payload)
            .digest("base64url");

        if (
            !crypto.timingSafeEqual(
                Buffer.from(signature),
                Buffer.from(expectedSignature)
            )
        ) {
            return null;
        }

        const data = JSON.parse(
            Buffer.from(payload, "base64url").toString("utf8")
        );

        if (Date.now() > data.exp) {
            return null;
        }

        return data;
    } catch {
        return null;
    }
}

function hashOtp(otp: string) {
    return crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");
}

const MAX_OTP_ATTEMPTS = 5;

// The reset state lives in the user's app_metadata (not editable by the user):
// a nonce that ties the signed cookie to the LATEST request, and a counter of
// wrong guesses. Without this a 6-digit code could be brute-forced, because
// the signed cookie alone cannot count attempts.
async function readResetState(userId: string) {
    const { data } = await supabaseAdmin!.auth.admin.getUserById(userId);
    const meta = (data?.user?.app_metadata || {}) as Record<string, any>;
    return { meta, nonce: meta.reset_nonce as string | undefined, attempts: Number(meta.reset_attempts || 0) };
}

async function writeResetState(userId: string, meta: Record<string, any>, patch: Record<string, any>) {
    await supabaseAdmin!.auth.admin.updateUserById(userId, { app_metadata: { ...meta, ...patch } });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const action = body.action;

        // --------------------------------------------------
        // SEND OTP
        // --------------------------------------------------
        if (action === "send") {
            const email = String(body.email || "")
                .trim()
                .toLowerCase();

            if (!email) {
                return NextResponse.json(
                    { error: "Email is required." },
                    { status: 400 }
                );
            }

            if (!supabaseAdmin) {
                return NextResponse.json(
                    { error: "Server authentication is not configured." },
                    { status: 500 }
                );
            }

            if (!isMailConfigured()) {
                console.error("Password reset requested but email is not configured (EMAIL_USER / EMAIL_PASSWORD).");

                return NextResponse.json(
                    { error: "We can't send emails right now. Please contact support at hello@vstories.in." },
                    { status: 503 }
                );
            }

            // Find the Supabase Auth user (the admin API has no lookup by
            // email, so walk the pages until we find them)
            let user: { id: string; email?: string } | undefined;

            for (let page = 1; page <= 50 && !user; page++) {
                const { data: usersData, error: usersError } =
                    await supabaseAdmin.auth.admin.listUsers({
                        page,
                        perPage: 1000,
                    });

                if (usersError) {
                    console.error("Error finding user:", usersError);

                    return NextResponse.json(
                        { error: "Unable to process request." },
                        { status: 500 }
                    );
                }

                user = usersData.users.find(
                    (item) => item.email?.toLowerCase() === email
                );

                if (usersData.users.length < 1000) break;
            }

            if (!user) {
                return NextResponse.json(
                    { error: "No account found with this email address." },
                    { status: 404 }
                );
            }

            // Generate 6-digit OTP
            const otp = crypto
                .randomInt(100000, 1000000)
                .toString();

            const expiresAt =
                Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000;

            const nonce = crypto.randomBytes(16).toString("hex");
            const state = await readResetState(user.id);
            await writeResetState(user.id, state.meta, { reset_nonce: nonce, reset_attempts: 0 });

            const token = createToken({
                email,
                userId: user.id,
                otpHash: hashOtp(otp),
                nonce,
                exp: expiresAt,
                verified: false,
            });

            const emailHtml = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px;">
                    <div style="background:#5c8d89; padding:25px; text-align:center; border-radius:12px 12px 0 0;">
                        <h1 style="color:white; margin:0;">V STORIES</h1>
                        <p style="color:white; margin:8px 0 0;">Password Reset</p>
                    </div>

                    <div style="background:#ffffff; padding:35px; border:1px solid #eee;">
                        <h2 style="color:#333;">Reset Your Password</h2>

                        <p style="color:#555;">
                            Use the verification code below to reset your V STORIES password.
                        </p>

                        <div style="
                            text-align:center;
                            margin:30px 0;
                            padding:20px;
                            background:#f8fcfc;
                            border-radius:10px;
                            border:1px solid #dfeeee;
                        ">
                            <div style="
                                font-size:32px;
                                font-weight:bold;
                                letter-spacing:8px;
                                color:#5c8d89;
                            ">
                                ${otp}
                            </div>
                        </div>

                        <p style="color:#666;">
                            This code will expire in ${OTP_EXPIRY_MINUTES} minutes.
                        </p>

                        <p style="color:#999; font-size:13px;">
                            If you did not request a password reset, you can safely ignore this email.
                        </p>
                    </div>

                    <div style="
                        text-align:center;
                        padding:20px;
                        color:#999;
                        font-size:12px;
                    ">
                        © ${new Date().getFullYear()} V STORIES. All rights reserved.
                    </div>
                </div>
            `;

            const emailResult = await sendEmail({
                to: email,
                subject: "Your V STORIES Password Reset OTP",
                html: emailHtml,
            });

            if (!emailResult.success) {
                console.error(
                    "OTP email failed:",
                    emailResult.reason,
                    emailResult.error
                );

                // "auth" / "not-configured" are our configuration problem, not the customer's
                const message =
                    emailResult.reason === "rejected"
                        ? "We couldn't deliver the email to this address. Please check it and try again."
                        : "We couldn't send the verification email right now. Please try again in a few minutes.";

                return NextResponse.json(
                    { error: message },
                    { status: emailResult.reason === "rejected" ? 400 : 503 }
                );
            }

            const cookieStore = await cookies();

            cookieStore.set(OTP_COOKIE, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: OTP_EXPIRY_MINUTES * 60,
                path: "/",
            });

            return NextResponse.json({
                success: true,
                message: "OTP sent successfully.",
            });
        }

        // --------------------------------------------------
        // VERIFY OTP
        // --------------------------------------------------
        if (action === "verify") {
            const otp = String(body.otp || "").trim();

            if (!/^\d{6}$/.test(otp)) {
                return NextResponse.json(
                    { error: "Please enter the 6-digit code." },
                    { status: 400 }
                );
            }

            const cookieStore = await cookies();
            const token = cookieStore.get(OTP_COOKIE)?.value;

            if (!token) {
                return NextResponse.json(
                    { error: "OTP expired. Please request a new code." },
                    { status: 400 }
                );
            }

            const data = verifyToken(token);

            if (!data) {
                return NextResponse.json(
                    { error: "OTP expired. Please request a new code." },
                    { status: 400 }
                );
            }

            if (!supabaseAdmin) {
                return NextResponse.json(
                    { error: "Server authentication is not configured." },
                    { status: 500 }
                );
            }

            const state = await readResetState(data.userId);
            if (!state.nonce || state.nonce !== data.nonce) {
                return NextResponse.json(
                    { error: "This code is no longer valid. Please request a new one." },
                    { status: 400 }
                );
            }

            if (data.verified) {
                return NextResponse.json({
                    success: true,
                    message: "OTP already verified.",
                });
            }

            if (state.attempts >= MAX_OTP_ATTEMPTS) {
                return NextResponse.json(
                    { error: "Too many incorrect attempts. Please request a new code." },
                    { status: 429 }
                );
            }

            if (hashOtp(otp) !== data.otpHash) {
                await writeResetState(data.userId, state.meta, { reset_attempts: state.attempts + 1 });
                return NextResponse.json(
                    { error: "Invalid OTP. Please check the code and try again." },
                    { status: 400 }
                );
            }

            const verifiedToken = createToken({
                ...data,
                verified: true,
            });

            cookieStore.set(OTP_COOKIE, verifiedToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: OTP_EXPIRY_MINUTES * 60,
                path: "/",
            });

            return NextResponse.json({
                success: true,
                message: "OTP verified successfully.",
            });
        }

        // --------------------------------------------------
        // RESET PASSWORD
        // --------------------------------------------------
        if (action === "reset") {
            const password = String(body.password || "");

            if (!password) {
                return NextResponse.json(
                    { error: "Password is required." },
                    { status: 400 }
                );
            }

            const cookieStore = await cookies();
            const token = cookieStore.get(OTP_COOKIE)?.value;

            if (!token) {
                return NextResponse.json(
                    { error: "Password reset session expired." },
                    { status: 400 }
                );
            }

            const data = verifyToken(token);

            if (!data || !data.verified) {
                return NextResponse.json(
                    { error: "Please verify the OTP first." },
                    { status: 400 }
                );
            }

            if (!supabaseAdmin) {
                return NextResponse.json(
                    { error: "Server authentication is not configured." },
                    { status: 500 }
                );
            }

            const passwordError = validatePasswordField(password, "Password");
            if (passwordError) {
                return NextResponse.json({ error: passwordError }, { status: 400 });
            }

            const state = await readResetState(data.userId);
            if (!state.nonce || state.nonce !== data.nonce) {
                return NextResponse.json(
                    { error: "This reset session is no longer valid. Please start again." },
                    { status: 400 }
                );
            }

            const { error: updateError } =
                await supabaseAdmin.auth.admin.updateUserById(
                    data.userId,
                    {
                        password,
                        // single use: the same cookie can never reset the password twice
                        app_metadata: { ...state.meta, reset_nonce: null, reset_attempts: 0 },
                    }
                );

            if (updateError) {
                console.error(
                    "Password update error:",
                    updateError
                );

                return NextResponse.json(
                    { error: updateError.message },
                    { status: 500 }
                );
            }

            cookieStore.delete(OTP_COOKIE);

            return NextResponse.json({
                success: true,
                message: "Password updated successfully.",
            });
        }

        return NextResponse.json(
            { error: "Invalid action." },
            { status: 400 }
        );
    } catch (error: unknown) {
        console.error("Forgot password API error:", error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong. Please try again.",
            },
            { status: 500 }
        );
    }
}