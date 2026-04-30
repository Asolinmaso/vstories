
import { NextResponse } from 'next/server';
import { sendEmail, getAdminNotificationHTML, getUserWelcomeHTML } from '@/lib/email';
import { sanitizeContactForm } from '@/lib/sanitize';

export async function POST(request: Request) {
    try {
        const rawData = await request.json();

        // Sanitize and validate input
        const sanitized = sanitizeContactForm(rawData);
        
        if ('error' in sanitized) {
            return NextResponse.json(
                { error: sanitized.error },
                { status: 400 }
            );
        }

        const formData = sanitized;

        // 1. Send notification email to admin
        const adminEmail = await sendEmail({
            to: process.env.EMAIL_USER as string,
            subject: `New Contact Form Submission from ${formData.name}`,
            html: getAdminNotificationHTML(formData),
        });

        // 2. Send confirmation email to user
        const userConfirmation = await sendEmail({
            to: formData.email,
            subject: 'Thank for contacting V STORIES',
            html: getUserWelcomeHTML(formData),
        });

        if (!adminEmail.success || !userConfirmation.success) {
            console.error('Email sending failed:', { adminEmail, userConfirmation });
            // We still return success to the user if at least one email succeeded or if it's a backend issue
            // but logging it is important.
            if (!adminEmail.success && !userConfirmation.success) {
                return NextResponse.json(
                    { error: 'Failed to send emails' },
                    { status: 500 }
                );
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Contact form submitted successfully',
        });

    } catch (error: any) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}
