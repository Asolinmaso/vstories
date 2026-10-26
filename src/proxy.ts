import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export default async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // Skip middleware for static files, images, and internal Next.js routes
    const { pathname } = request.nextUrl;

    // We removed the legacy redirect for /profile and /account because we just built the new Profile page!
    // if (pathname.startsWith('/account') || pathname.startsWith('/profile')) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }

    // ── OAuth code interception ──────────────────────────────────────────────
    // Supabase may land on the site root (or any page) with ?code= when the
    // /auth/callback URL isn't whitelisted. Catch it here and forward properly.
    const code = request.nextUrl.searchParams.get('code');
    if (code && pathname !== '/auth/callback') {
        const callbackUrl = new URL('/auth/callback', request.url);
        callbackUrl.searchParams.set('code', code);
        const next = request.nextUrl.searchParams.get('next');
        if (next) callbackUrl.searchParams.set('next', next);
        return NextResponse.redirect(callbackUrl);
    }

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api/auth') || // Let auth routes pass through
        pathname.includes('.')
    ) {
        return response;
    }

    // CSRF Protection for mutation API routes (non-auth)
    // /api/payment/callback receives Razorpay's own cross-site form POST; it is
    // authenticated by the payment signature instead of the Origin header.
    if (request.nextUrl.pathname.startsWith('/api/') && request.nextUrl.pathname !== '/api/payment/callback') {
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

    // Route groups. Customers own the shopping routes, admins own /admin.
    const startsWithAny = (prefixes: string[]) =>
        prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
    const isAdminRoute = startsWithAny(['/admin']);
    const isLoginRequiredRoute = startsWithAny(['/checkout', '/order-success']);
    // Pages that only make sense for a shopper (their cart, wishlist, account)
    const isCustomerRoute = isLoginRequiredRoute || startsWithAny(['/cart', '/wishlist', '/profile']);

    const hasSessionCookie = request.cookies.getAll().some((cookie) => cookie.name.startsWith('sb-'));

    // Only hit Supabase when a route actually depends on who is signed in.
    // This avoids a network round-trip on every public page.
    if (isAdminRoute || isLoginRequiredRoute || (isCustomerRoute && hasSessionCookie)) {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            if (isAdminRoute || isLoginRequiredRoute) {
                const redirectUrl = new URL('/', request.url);
                redirectUrl.searchParams.set('login', '1');
                redirectUrl.searchParams.set('redirect', pathname);
                return NextResponse.redirect(redirectUrl);
            }
            return response;
        }

        // Role check (service key, so RLS can never lock a real admin out)
        let isAdmin = false;
        if (supabaseAdmin) {
            const { data: profile } = await supabaseAdmin
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .maybeSingle();
            isAdmin = profile?.role === 'admin';
        }

        // Customers can never open the admin area, even by typing the URL
        if (isAdminRoute && !isAdmin) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Admins get their own dashboard instead of the shopper's cart/checkout/account
        if (isAdmin && isCustomerRoute) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

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
