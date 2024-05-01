
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isAdminPath = path === '/admin/login' || path === '/admin/registration';

    const token = request.cookies.get('admintoken')?.value ;
    
    if(isAdminPath && token){
        return NextResponse.redirect(new URL('/admin/blogs', request.nextUrl));
    }
    if(!isAdminPath && !token){
        return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
    }


}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/admin/:path*'
        
    ],
} 