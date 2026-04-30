import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD?.replace(/\s/g, ''),
    },
});

function getGoogleWelcomeHTML(
    fullName: string,
    email: string,
    defaultPassword: string
): string {
    const year = new Date().getFullYear();
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to V Stories!</title>
</head>
<body style="margin:0;padding:0;background:#fce7f3;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="padding:40px 20px;">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
      <!-- Header -->
      <div style="background:#5c8d89;padding:40px 30px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:30px;font-weight:300;letter-spacing:2px;">V STORIES</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:13px;">Herbal | Natural | Pure</p>
      </div>

      <!-- Body -->
      <div style="padding:40px 32px;">
        <p style="font-size:20px;color:#5c8d89;margin:0 0 16px;">Welcome, ${fullName}! 🎉</p>
        <p style="color:#555;margin:0 0 20px;line-height:1.7;">
          You've successfully signed in to <strong>V Stories</strong> using your Google account.
          We've automatically created a V Stories account for you.
        </p>

        <!-- Credentials Box -->
        <div style="background:#f8fcfc;border-left:4px solid #5c8d89;border-radius:8px;padding:20px 24px;margin:24px 0;">
          <p style="margin:0 0 8px;font-weight:600;color:#5c8d89;font-size:14px;">YOUR ACCOUNT CREDENTIALS</p>
          <p style="margin:4px 0;color:#444;font-size:14px;"><strong>Email:</strong> ${email}</p>
          <p style="margin:4px 0;color:#444;font-size:14px;"><strong>Password:</strong> <code style="background:#eee;padding:2px 6px;border-radius:4px;font-size:13px;">${defaultPassword}</code></p>
          <p style="margin:12px 0 0;font-size:12px;color:#888;">
            You can use these credentials to sign in directly — or simply continue using Google login.
            We recommend changing your password from your account settings.
          </p>
        </div>

        <!-- CTA -->
        <div style="text-align:center;margin:32px 0 16px;">
          <a href="https://vstories.in/shop"
             style="display:inline-block;background:#d4a373;color:#fff;text-decoration:none;padding:13px 36px;border-radius:30px;font-weight:bold;font-size:15px;">
            Explore Our Collection
          </a>
        </div>

        <p style="color:#888;font-size:13px;text-align:center;margin:0;">
          If you did not sign up for V Stories, please 
          <a href="mailto:hello@vstories.in" style="color:#5c8d89;">contact us</a> immediately.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f9fafb;padding:24px 30px;text-align:center;border-top:1px solid #eee;">
        <p style="margin:0 0 6px;font-size:13px;color:#888;">
          <strong style="color:#555;">V Stories</strong> · Kilakarai, Tamil Nadu, India
        </p>
        <p style="margin:0;font-size:12px;color:#aaa;">
          <a href="mailto:hello@vstories.in" style="color:#5c8d89;text-decoration:none;">hello@vstories.in</a>
          &nbsp;|&nbsp;
          <a href="tel:+916383921957" style="color:#5c8d89;text-decoration:none;">+91 6383921957</a>
        </p>
        <p style="margin:16px 0 0;font-size:11px;color:#ccc;">© ${year} V Stories. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
    try {
        const { email, fullName, defaultPassword } = await request.json();

        if (!email || !fullName || !defaultPassword) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const html = getGoogleWelcomeHTML(fullName, email, defaultPassword);

        await transporter.sendMail({
            from: `"V Stories" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🌿 Welcome to V Stories – Your Account Details',
            html,
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[Send Welcome Email] Error:', error);
        // Return 200 even on failure so the auth flow isn't interrupted
        return NextResponse.json({ success: false, error: error.message });
    }
}
