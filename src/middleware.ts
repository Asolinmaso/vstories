import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // Skip middleware for static files, images, and internal Next.js routes
    const { pathname } = request.nextUrl;
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api/auth') || // Let auth routes pass through
        pathname.includes('.')
    ) {
        return response;
    }

    // CSRF Protection for mutation API routes (non-auth)
    if (request.nextUrl.pathname.startsWith('/api/')) {
        const origin = request.headers.get('origin');
        const host = request.headers.get('host');

        const allowedOrigins = [
            `https://${host}`,
            `http://${host}`,
            process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
        ].filter(Boolean) as string[];

        if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
            if (origin && !allowedOrigins.some((allowed) => origin.startsWith(allowed))) {
                return NextResponse.json(
                    { error: 'Forbidden - Invalid origin' },
                    { status: 403 }
                );
            }
        }
    }

    // Refresh Supabase session so it doesn't expire mid-use
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({ name, value, ...options } as any);
                    response = NextResponse.next({ request: { headers: request.headers } });
                    response.cookies.set({ name, value, ...options } as any);
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({ name, value: '', ...options } as any);
                    response = NextResponse.next({ request: { headers: request.headers } });
                    response.cookies.set({ name, value: '', ...options } as any);
                },
            },
        }
    );

    await supabase.auth.getSession();

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimisation)
         * - favicon.ico
         * - public folder files
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
