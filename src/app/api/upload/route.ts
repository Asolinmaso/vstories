
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        // Check for admin client
        if (!supabaseAdmin) {
            console.error('Supabase Admin client not initialized. Check SUPABASE_SERVICE_ROLE_KEY.');
            return NextResponse.json(
                { error: 'Server configuration error: Missing Service Role Key' },
                { status: 500 }
            );
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;
        // Client sends the desired path, e.g., "product-images/123-filename.jpg"
        const filePath = formData.get('path') as string;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }
        if (!filePath) {
            return NextResponse.json({ error: 'No file path provided' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { error: uploadError } = await supabaseAdmin.storage
            .from('products')
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: true,
            });

        if (uploadError) {
            console.error('Supabase storage upload error:', uploadError);
            return NextResponse.json({ error: uploadError.message }, { status: 500 });
        }

        const { data } = supabaseAdmin.storage
            .from('products')
            .getPublicUrl(filePath);

        return NextResponse.json({ url: data.publicUrl });
    } catch (error: any) {
        console.error('Unexpected error in /api/upload:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        if (!supabaseAdmin) {
            return NextResponse.json(
                { error: 'Server configuration error: Missing Service Role Key' },
                { status: 500 }
            );
        }

        const { url } = await req.json();
        if (!url) {
            return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
        }

        // Extract file path from URL
        // Example public URL: https://[project].supabase.co/storage/v1/object/public/products/product-images/17000000-name.jpg
        // We need 'product-images/17000000-name.jpg'
        const pathParts = url.split('/products/');
        if (pathParts.length < 2) {
            return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
        }
        // Decode URI component in case filename has spaces/special chars
        const relativePath = decodeURIComponent(pathParts[1]);

        const { error } = await supabaseAdmin.storage
            .from('products')
            .remove([relativePath]);

        if (error) {
            console.error('Storage delete error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Unexpected error in /api/upload DELETE:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
