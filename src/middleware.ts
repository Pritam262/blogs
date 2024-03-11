import next from 'next';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isAdminPath = path === '/admin/adminlogin' || 'admin/adminregister';
    const adminUser = path === '/admin/user';

    const userId = request.cookies.get('authtoken' || ' ');

    if (isAdminPath && userId) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    } else if (!isAdminPath && !userId) {
        return NextResponse.redirect(new URL('/admin/adminlogin', request.nextUrl))
    }


}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/admin/adminlogin',
        '/admin/adminregistration',
    ],
} 