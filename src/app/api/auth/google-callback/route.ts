/**
 * @deprecated This route is no longer used.
 * Google OAuth is now handled entirely via Supabase native OAuth at /auth/callback.
 * Kept to avoid 404s from any bookmarked/cached links.
 */
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    return NextResponse.redirect(new URL('/login', request.url));
}
