import nodemailer, { type Transporter } from 'nodemailer';

// One mail transport for the whole site (order emails, contact form, password
// reset codes). Configure ONE of:
//
//  1. Gmail:        EMAIL_USER + EMAIL_PASSWORD  (a 16-character Google App Password,
//                   NOT the normal Gmail password)
//  2. Any provider: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (+ optional
//                   SMTP_SECURE=true, MAIL_FROM) — e.g. Brevo, Resend, SES, Zoho
//
// Emails are never allowed to hang a request: every network step has a timeout.

let transporter: Transporter | null = null;

export function isMailConfigured(): boolean {
    return Boolean(process.env.SMTP_HOST || (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD));
}

function getTransporter(): Transporter {
    if (transporter) return transporter;

    const timeouts = {
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 12000,
    };

    if (process.env.SMTP_HOST) {
        const port = Number(process.env.SMTP_PORT || 587);
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port,
            secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
            auth: process.env.SMTP_USER
                ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
                : undefined,
            ...timeouts,
        });
    } else {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD?.replace(/\s/g, ''),
            },
            ...timeouts,
        });
    }
    return transporter;
}

/** Where site notifications (contact form, feedback) are delivered */
export function getAdminMailbox(): string {
    return (process.env.ADMIN_EMAIL || process.env.EMAIL_USER || process.env.SMTP_USER || '') as string;
}

export function getMailFrom(displayName: string): string {
    const address = process.env.MAIL_FROM || process.env.SMTP_USER || process.env.EMAIL_USER;
    return `"${displayName}" <${address}>`;
}

export interface MailResult {
    success: boolean;
    messageId?: string;
    error?: string;
    /** 'not-configured' | 'auth' | 'network' | 'rejected' | 'unknown' */
    reason?: 'not-configured' | 'auth' | 'network' | 'rejected' | 'unknown';
}

function classify(error: any): MailResult['reason'] {
    const code = error?.code;
    if (code === 'EAUTH' || error?.responseCode === 535) return 'auth';
    if (['ECONNECTION', 'ETIMEDOUT', 'ESOCKET', 'ECONNREFUSED', 'EDNS', 'ENOTFOUND'].includes(code)) return 'network';
    if (code === 'EENVELOPE' || (error?.responseCode >= 500 && error?.responseCode < 600)) return 'rejected';
    return 'unknown';
}

export async function sendMail(options: {
    to: string;
    subject: string;
    html: string;
    fromName?: string;
    replyTo?: string;
}): Promise<MailResult> {
    if (!isMailConfigured()) {
        console.error('[mail] Email is not configured. Set EMAIL_USER + EMAIL_PASSWORD (Gmail app password) or SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS.');
        return { success: false, error: 'Email is not configured', reason: 'not-configured' };
    }

    try {
        const info = await getTransporter().sendMail({
            from: getMailFrom(options.fromName || 'V Stories'),
            to: options.to,
            subject: options.subject,
            html: options.html,
            replyTo: options.replyTo,
        });
        return { success: true, messageId: info.messageId };
    } catch (error: any) {
        const reason = classify(error);
        console.error(`[mail] Sending failed (${reason}): ${error?.message}`);
        if (reason === 'auth') {
            console.error('[mail] The mail server rejected the login. For Gmail, create a new App Password at https://myaccount.google.com/apppasswords (2-Step Verification must be on) and put it in EMAIL_PASSWORD.');
        }
        return { success: false, error: error?.message || 'Failed to send email', reason };
    }
}
