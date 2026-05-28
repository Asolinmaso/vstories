
import nodemailer from 'nodemailer';

// Create transporter with explicit SMTP configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD?.replace(/\s/g, ''), // Remove any spaces if present
    },
});

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    subject?: string;
}

interface FeedbackFormData {
    name: string;
    email: string;
    phone?: string;
    product?: string;
    rating?: number;
    message: string;
}

// Admin Notification Template
export function getAdminNotificationHTML(data: ContactFormData) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
                body { font-family: sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #5c8d89; color: white; padding: 15px; border-radius: 5px 5px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #5c8d89; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2 style="margin:0;">New Contact Inquiry</h2>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">Name</div>
                        <div>${data.name}</div>
                    </div>
                    <div class="field">
                        <div class="label">Email</div>
                        <div>${data.email}</div>
                    </div>
                    <div class="field">
                        <div class="label">Phone</div>
                        <div>${data.phone}</div>
                    </div>
                    <div class="field">
                        <div class="label">Subject</div>
                        <div>${data.subject || 'General Inquiry'}</div>
                    </div>
                    <div class="field">
                        <div class="label">Message</div>
                        <div style="background: white; padding: 10px; border-radius: 4px; border: 1px solid #eee;">
                            ${data.message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
}

// User Welcome Template
export function getUserWelcomeHTML(data: ContactFormData) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Thank You from V STORIES</title>
            <style>
                body {
                    font-family: 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.6;
                    color: #4a4a4a;
                    background-color: #fce7f3; /* Light pink background */
                    margin: 0;
                    padding: 0;
                }
                .wrapper {
                    padding: 40px 20px;
                }
                .container {
                    background: white;
                    max-width: 600px;
                    margin: 0 auto;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }
                .header {
                    background: #5c8d89; /* Primary Green */
                    padding: 40px 20px;
                    text-align: center;
                }
                .header h1 {
                    color: white;
                    margin: 0;
                    font-size: 28px;
                    font-weight: 300;
                    letter-spacing: 1px;
                }
                .content {
                    padding: 40px;
                }
                .greeting {
                    font-size: 20px;
                    color: #5c8d89;
                    margin-bottom: 20px;
                }
                .message-box {
                    background: #f8fcfc;
                    border-left: 4px solid #d4a373; /* Gold/Highlight */
                    padding: 20px;
                    margin: 25px 0;
                    border-radius: 4px;
                    font-style: italic;
                    color: #666;
                }
                .features {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin: 30px 0;
                    text-align: center;
                }
                .feature-item {
                    background: #fce7f3;
                    padding: 15px;
                    border-radius: 8px;
                    font-size: 14px;
                    color: #5c8d89;
                }
                .btn {
                    display: inline-block;
                    background: #d4a373; /* Gold */
                    color: white;
                    text-decoration: none;
                    padding: 12px 30px;
                    border-radius: 30px;
                    font-weight: bold;
                    margin-top: 20px;
                }
                .footer {
                    background: #f9fafb;
                    padding: 30px;
                    text-align: center;
                    font-size: 13px;
                    color: #888;
                    border-top: 1px solid #eee;
                }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="container">
                    <div class="header">
                        <h1>V STORIES</h1>
                        <p style="color: rgba(255,255,255,0.9); margin-top: 5px; font-size: 14px;">Herbal | Natural | Pure</p>
                    </div>
                    <div class="content">
                        <div class="greeting">Hello ${data.name},</div>
                        <p>Thank you for reaching out to V Stories! We have received your message and our team will get back to you shortly.</p>
                        
                        <p>We appreciate your interest in our natural, chemical-free products crafted with traditional wisdom.</p>
                        
                        <div class="message-box">
                            " ${data.message} "
                        </div>

                        <div class="features">
                            <div class="feature-item">🌿 100% Natural</div>
                            <div class="feature-item">✨ Chemical Free</div>
                        </div>

                        <div style="text-align: center;">
                            <a href="https://vstories.in/shop" class="btn">Explore Our Collection</a>
                        </div>
                    </div>
                    <div class="footer">
                        <p><strong>V Stories</strong><br>
                        Kilakarai, Tamil Nadu, India</p>
                        <p>
                            <a href="mailto:hello@vstories.in" style="color: #5c8d89; text-decoration: none;">hello@vstories.in</a> | 
                            <a href="tel:+916383921957" style="color: #5c8d89; text-decoration: none;">+91 6383921957</a>
                        </p>
                        <p style="margin-top: 20px; color: #aaa;">© ${new Date().getFullYear()} V Stories. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Feedback Admin Notification Template
export function getFeedbackAdminHTML(data: FeedbackFormData) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>New Product Feedback</title>
            <style>
                body { font-family: sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #5c8d89; color: white; padding: 15px; border-radius: 5px 5px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #5c8d89; }
                .rating { font-size: 18px; color: #d4a373; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2 style="margin:0;">New Product Feedback</h2>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">Name</div>
                        <div>${data.name}</div>
                    </div>
                    <div class="field">
                        <div class="label">Email</div>
                        <div>${data.email}</div>
                    </div>
                    ${data.phone ? `
                    <div class="field">
                        <div class="label">Phone</div>
                        <div>${data.phone}</div>
                    </div>
                    ` : ''}
                    ${data.product ? `
                    <div class="field">
                        <div class="label">Product</div>
                        <div>${data.product}</div>
                    </div>
                    ` : ''}
                    ${data.rating ? `
                    <div class="field">
                        <div class="label">Rating</div>
                        <div class="rating">${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}</div>
                    </div>
                    ` : ''}
                    <div class="field">
                        <div class="label">Feedback</div>
                        <div style="background: white; padding: 10px; border-radius: 4px; border: 1px solid #eee;">
                            ${data.message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Feedback User Confirmation Template
export function getFeedbackUserHTML(data: FeedbackFormData) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Thank You for Your Feedback</title>
            <style>
                body {
                    font-family: 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.6;
                    color: #4a4a4a;
                    background-color: #fce7f3;
                    margin: 0;
                    padding: 0;
                }
                .wrapper {
                    padding: 40px 20px;
                }
                .container {
                    background: white;
                    max-width: 600px;
                    margin: 0 auto;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }
                .header {
                    background: #5c8d89;
                    padding: 40px 20px;
                    text-align: center;
                }
                .header h1 {
                    color: white;
                    margin: 0;
                    font-size: 28px;
                    font-weight: 300;
                    letter-spacing: 1px;
                }
                .content {
                    padding: 40px;
                }
                .greeting {
                    font-size: 20px;
                    color: #5c8d89;
                    margin-bottom: 20px;
                }
                .message-box {
                    background: #f8fcfc;
                    border-left: 4px solid #d4a373;
                    padding: 20px;
                    margin: 25px 0;
                    border-radius: 4px;
                    font-style: italic;
                    color: #666;
                }
                .btn {
                    display: inline-block;
                    background: #d4a373;
                    color: white;
                    text-decoration: none;
                    padding: 12px 30px;
                    border-radius: 30px;
                    font-weight: bold;
                    margin-top: 20px;
                }
                .footer {
                    background: #f9fafb;
                    padding: 30px;
                    text-align: center;
                    font-size: 13px;
                    color: #888;
                    border-top: 1px solid #eee;
                }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="container">
                    <div class="header">
                        <h1>V STORIES</h1>
                        <p style="color: rgba(255,255,255,0.9); margin-top: 5px; font-size: 14px;">Herbal | Natural | Pure</p>
                    </div>
                    <div class="content">
                        <div class="greeting">Thank you, ${data.name}!</div>
                        <p>We truly appreciate your feedback! Your insights help us create better products and improve our services.</p>

                        ${data.product ? `<p><strong>Product:</strong> ${data.product}</p>` : ''}

                        <div class="message-box">
                            " ${data.message} "
                        </div>

                        <p>Our team has received your feedback and will review it carefully. If you have any further suggestions or questions, feel free to reach out!</p>

                        <div style="text-align: center;">
                            <a href="https://vstories.in/shop" class="btn">Explore More Products</a>
                        </div>
                    </div>
                    <div class="footer">
                        <p><strong>V Stories</strong><br>
                        Kilakarai, Tamil Nadu, India</p>
                        <p>
                            <a href="mailto:hello@vstories.in" style="color: #5c8d89; text-decoration: none;">hello@vstories.in</a> |
                            <a href="tel:+916383921957" style="color: #5c8d89; text-decoration: none;">+91 6383921957</a>
                        </p>
                        <p style="margin-top: 20px; color: #aaa;">© ${new Date().getFullYear()} V Stories. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
}

interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
    try {
        const info = await transporter.sendMail({
            from: `"V Stories Support" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error: any) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}
