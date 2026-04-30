import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ─── Admin Supabase client (bypasses RLS) ────────────────────────────────────
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
);

// ─── Email transport ──────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD?.replace(/\s/g, ''),
    },
});

function buildWelcomeEmail(fullName: string, email: string, password: string): string {
    const year = new Date().getFullYear();
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Welcome to V Stories!</title>
</head>
<body style="margin:0;padding:0;background:#fce7f3;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="padding:40px 20px;">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
      <div style="background:#5c8d89;padding:40px 30px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:30px;font-weight:300;letter-spacing:2px;">V STORIES</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:13px;">Herbal | Natural | Pure</p>
      </div>
      <div style="padding:40px 32px;">
        <p style="font-size:20px;color:#5c8d89;margin:0 0 16px;">Welcome, ${fullName}! 🎉</p>
        <p style="color:#555;margin:0 0 20px;line-height:1.7;">
          You've successfully signed in to <strong>V Stories</strong> using your Google account.
          We've automatically created a V Stories account for you so you can also sign in with email &amp; password.
        </p>
        <div style="background:#f8fcfc;border-left:4px solid #5c8d89;border-radius:8px;padding:20px 24px;margin:24px 0;">
          <p style="margin:0 0 10px;font-weight:600;color:#5c8d89;font-size:13px;letter-spacing:0.5px;">YOUR ACCOUNT CREDENTIALS</p>
          <p style="margin:4px 0;color:#444;font-size:14px;"><strong>Email:</strong> ${email}</p>
          <p style="margin:4px 0;color:#444;font-size:14px;"><strong>Password:</strong>
            <code style="background:#eef;padding:2px 8px;border-radius:4px;font-size:13px;color:#5c8d89;">${password}</code>
          </p>
          <p style="margin:14px 0 0;font-size:12px;color:#999;line-height:1.6;">
            You can continue signing in via Google, or use these credentials directly.
            <br/>We strongly recommend changing your password from your Account Settings.
          </p>
        </div>
        <div style="text-align:center;margin:32px 0 16px;">
          <a href="https://vstories.in/shop"
             style="display:inline-block;background:#d4a373;color:#fff;text-decoration:none;padding:13px 36px;border-radius:30px;font-weight:bold;font-size:15px;">
            Explore Our Collection
          </a>
        </div>
        <p style="color:#aaa;font-size:12px;text-align:center;margin:0;">
          Didn't sign up? <a href="mailto:hello@vstories.in" style="color:#5c8d89;">Contact us</a> immediately.
        </p>
      </div>
      <div style="background:#f9fafb;padding:24px 30px;text-align:center;border-top:1px solid #eee;">
        <p style="margin:0 0 6px;font-size:13px;color:#888;">
          <strong style="color:#555;">V Stories</strong> &middot; Kilakarai, Tamil Nadu, India
        </p>
        <p style="margin:0;font-size:12px;">
          <a href="mailto:hello@vstories.in" style="color:#5c8d89;text-decoration:none;">hello@vstories.in</a>
          &nbsp;|&nbsp;
          <a href="tel:+916383921957" style="color:#5c8d89;text-decoration:none;">+91 6383921957</a>
        </p>
        <p style="margin:14px 0 0;font-size:11px;color:#ccc;">&copy; ${year} V Stories. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

async function sendWelcomeEmail(
    email: string,
    fullName: string,
    password: string
): Promise<void> {
    try {
        await transporter.sendMail({
            from: `"V Stories" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🌿 Welcome to V Stories – Your Account Details',
            html: buildWelcomeEmail(fullName, email, password),
        });
        console.log(`[Auth Callback] Welcome email sent to ${email}`);
    } catch (err) {
        // Non-fatal – log but don't break the auth flow
        console.error('[Auth Callback] Failed to send welcome email:', err);
    }
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/profile';

    // Prevent open-redirect attacks
    const safeNext =
        next.startsWith('/') && !next.startsWith('//') ? next : '/profile';

    if (!code) {
        console.error('[Auth Callback] No authorization code received');
        return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    cookieStore.set({ name, value, ...options });
                },
                remove(name: string, options: CookieOptions) {
                    cookieStore.delete({ name, ...options });
                },
            },
        }
    );

    // Exchange the OAuth code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.user) {
        console.error('[Auth Callback] Code exchange failed:', error?.message);
        return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }

    const { user } = data;

    // ── Profile check & creation (only for genuinely new users) ──────────────
    const { data: existingProfile } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();

    if (!existingProfile) {
        const fullName =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split('@')[0] ||
            'User';

        const defaultPassword = `${user.email}@vstories`;

        // 1. Create profile row
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .insert({
                id: user.id,
                full_name: fullName,
                role: 'user',
                email: user.email,
            });

        if (profileError) {
            console.error('[Auth Callback] Profile insert error:', profileError.message);
        }

        // 2. Set a password so user can also sign in via email+password
        const { error: pwError } = await supabaseAdmin.auth.admin.updateUserById(
            user.id,
            { password: defaultPassword }
        );

        if (pwError) {
            console.error('[Auth Callback] Password update error:', pwError.message);
        }

        // 3. Send welcome email (non-blocking via void)
        void sendWelcomeEmail(user.email!, fullName, defaultPassword);

        console.log(`[Auth Callback] New Google user provisioned: ${user.email}`);
    } else {
        console.log(`[Auth Callback] Existing user signed in: ${user.email}`);
    }

    // Redirect to the originally requested page (default: /profile)
    return NextResponse.redirect(`${origin}${safeNext}`);
}
