import { getAdminMailbox } from '@/lib/mailer';
import { NextResponse } from 'next/server';
import {
    sendEmail,
    getAdminNotificationHTML,
    getUserWelcomeHTML,
} from '@/lib/email';
import { sanitizeContactForm } from '@/lib/sanitize';

export async function POST(request: Request) {
    try {
        const rawData = await request.json();

        // Sanitize and validate the contact form
        const sanitized = sanitizeContactForm(rawData);

        if ('error' in sanitized) {
            return NextResponse.json(
                { error: sanitized.error },
                { status: 400 }
            );
        }

        const formData = sanitized;

        // Additional fields used by the Contact Us Google Sheet
        const countryCode =
            typeof rawData.countryCode === 'string'
                ? rawData.countryCode
                : '+91';

        const location =
            typeof rawData.location === 'string'
                ? rawData.location
                : '';

        const isInterested = rawData.isInterested === true;

        // ─────────────────────────────────────────
        // 1. Save Contact Us submission to Google Sheet
        // ─────────────────────────────────────────

        const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

        if (!scriptUrl) {
            throw new Error(
                'Google Apps Script URL is not configured'
            );
        }

        const sheetResponse = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formType: 'contact',
                name: formData.name,
                phone: `${countryCode} ${formData.phone}`,
                email: formData.email,
                location,
                message: formData.message,
                isInterested,
            }),
        });

        const sheetText = await sheetResponse.text();

        console.log("Google Apps Script response:", sheetText);

        let sheetResult;

        try {
            sheetResult = JSON.parse(sheetText);
        } catch {
            throw new Error(
                `Google Apps Script returned an invalid response: ${sheetText.slice(0, 300)}`
            );
        }

        if (!sheetResult.success) {
            throw new Error(
                sheetResult.error ||
                'Failed to save contact enquiry'
            );
        }

        // ─────────────────────────────────────────
        // 2. Send notification email to admin
        // ─────────────────────────────────────────

        const adminEmail = await sendEmail({
            to: getAdminMailbox(),
            subject: `New Contact Form Submission from ${formData.name}`,
            html: getAdminNotificationHTML(formData),
        });

        // ─────────────────────────────────────────
        // 3. Send confirmation email to user
        // ─────────────────────────────────────────

        const userConfirmation = await sendEmail({
            to: formData.email,
            subject: 'Thank for contacting V STORIES',
            html: getUserWelcomeHTML(formData),
        });

        // Handle email failures
        if (!adminEmail.success || !userConfirmation.success) {
            console.error('Email sending failed:', {
                adminEmail,
                userConfirmation,
            });

            if (
                !adminEmail.success &&
                !userConfirmation.success
            ) {
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
            {
                error: 'Internal server error',
                details: error.message,
            },
            { status: 500 }
        );
    }
}