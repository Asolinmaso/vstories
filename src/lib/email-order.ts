import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD?.replace(/\s/g, ''),
    },
});

export function getOrderConfirmationHTML(order: any, user: any) {
    const itemsHTML = order.items.map((item: any) => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <strong>${item.name}</strong><br>
                <span style="color: #666; font-size: 14px;">Qty: ${item.quantity}</span>
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">
                ₹${item.price * item.quantity}
            </td>
        </tr>
    `).join('');

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Order Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #1D3515; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="margin: 0; font-size: 28px;">Order Confirmed! 🎉</h1>
                <p style="margin: 10px 0 0; opacity: 0.9;">Thank you for your purchase</p>
            </div>

            <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 10px 10px;">
                <p>Hi ${user.user_metadata?.full_name || user.email},</p>
                <p>Your order has been confirmed and will be processed shortly.</p>

                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <strong>Order ID:</strong> ${order.id}<br>
                    <strong>Order Date:</strong> ${new Date(order.created_at).toLocaleDateString('en-IN')}<br>
                    <strong>Payment ID:</strong> ${order.razorpay_payment_id}
                </div>

                <h3 style="color: #1D3515; margin-top: 30px;">Order Items</h3>
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    ${itemsHTML}
                    <tr>
                        <td style="padding: 15px 12px; font-weight: bold; font-size: 18px;">Total</td>
                        <td style="padding: 15px 12px; text-align: right; font-weight: bold; font-size: 18px; color: #1D3515;">
                            ₹${order.amount}
                        </td>
                    </tr>
                </table>

                <h3 style="color: #1D3515; margin-top: 30px;">Shipping Address</h3>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
                    ${order.shipping_address.name}<br>
                    ${order.shipping_address.address}<br>
                    ${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.pincode}<br>
                    Phone: ${order.shipping_address.phone}
                </div>

                <div style="margin-top: 30px; padding: 20px; background: #e8f5e9; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; color: #2e7d32;">
                        <strong>🚚 Estimated Delivery:</strong> 5-7 business days
                    </p>
                </div>

                <div style="margin-top: 30px; text-align: center;">
                    <a href="https://vstories.in/profile/orders" 
                       style="display: inline-block; background: #1D3515; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                        Track Your Order
                    </a>
                </div>

                <p style="margin-top: 30px; color: #666; font-size: 14px;">
                    If you have any questions, please contact us at 
                    <a href="mailto:vstoriesmail@gmail.com" style="color: #1D3515;">vstoriesmail@gmail.com</a>
                </p>
            </div>

            <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                <p>V Stories - Premium Herbal Hair & Skincare</p>
                <p>© ${new Date().getFullYear()} V Stories. All rights reserved.</p>
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
            from: `"V Stories" <${process.env.EMAIL_USER}>`,
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
