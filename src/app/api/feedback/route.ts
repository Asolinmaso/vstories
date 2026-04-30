import { NextResponse } from 'next/server';
import { sendEmail, getFeedbackAdminHTML, getFeedbackUserHTML } from '@/lib/email';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const formData = await request.json();

        if (!formData.name || !formData.email || !formData.message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (!supabaseAdmin) {
            console.error('Supabase admin client not initialized');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Save to Supabase using admin client to bypass RLS
        const { data: insertedData, error: dbError } = await supabaseAdmin.from('feedback').insert({
                name: formData.name,
                email: formData.email,
                phone: formData.phone || null,
                product_id: formData.product_id || null,
                product_name: formData.product_name || null,
                rating: formData.rating || null,
                message: formData.message,
        }).select();
        
        if (dbError) {
            console.error('DB insert error:', dbError);
            return NextResponse.json(
                { error: 'Failed to save feedback', details: dbError.message },
                { status: 500 }
            );
        } else {
            console.log('Feedback saved to DB:', insertedData);
        }

        // Send notification email to admin
        const adminEmail = await sendEmail({
            to: process.env.EMAIL_USER as string,
            subject: `New Feedback from ${formData.name}`,
            html: getFeedbackAdminHTML({
                ...formData,
                product: formData.product_name,
            }),
        });

        // Send confirmation email to user
        const userConfirmation = await sendEmail({
            to: formData.email,
            subject: 'Thank you for your feedback - V STORIES',
            html: getFeedbackUserHTML({
                ...formData,
                product: formData.product_name,
            }),
        });

        // Log email status but don't fail the request
        if (!adminEmail.success) {
            console.error('Failed to send admin email:', adminEmail.error);
        }
        if (!userConfirmation.success) {
            console.error('Failed to send user confirmation email:', userConfirmation.error);
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Feedback submitted successfully',
            dbSaved: true,
            emailsSent: adminEmail.success && userConfirmation.success
        });

    } catch (error: any) {
        console.error('Feedback form error:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('product_id');

    try {
        if (!supabaseAdmin) {
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        let query = supabaseAdmin
            .from('feedback')
            .select('id, name, rating, message, product_name, created_at')
            .order('created_at', { ascending: false });

        if (productId) {
            query = query.eq('product_id', productId);
        }

        const { data, error } = await query;
        if (error) throw error;

        return NextResponse.json({ feedback: data || [] });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
