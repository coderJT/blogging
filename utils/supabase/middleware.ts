import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    // Log the request details for debugging
    console.log('Middleware triggered');
    console.log('Request Details:', {
        method: request.method,
        pathname: request.nextUrl.pathname,
        query: request.nextUrl.searchParams.toString(),
        headers: request.headers.get('user-agent') // Log user-agent or other headers if needed
    });

    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                
                setAll(cookiesToSet) {
                    console.log('Setting cookies:', cookiesToSet);
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));

                    supabaseResponse = NextResponse.next({ request });

                    cookiesToSet.forEach(({ name, value, options }) => {
                        supabaseResponse.cookies.set(name, value, options);
                    });
                }
            }
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    console.log('User:', user);

    // Prevents authenticated user from visiting login page
    if (user && request.nextUrl.pathname.startsWith('/login')) {
        console.log('Authenticated user trying to access login page, redirecting to profile');
        const url = request.nextUrl.clone();
        url.pathname = '/profile';
        return NextResponse.redirect(url);
    }

    // Prevents unauthenticated user from visiting other pages than specified
    if (
        !user && // Check if there is no authenticated user
        !(request.nextUrl.pathname === "/") && // Allow access to the home page
        !request.nextUrl.pathname.startsWith('/login') && // Allow access to the login page
        !request.nextUrl.pathname.startsWith('/forgot-password') && // Allow access to the forgot password page
        !request.nextUrl.pathname.startsWith('/check-email') && // Allow access to the check email page
        !request.nextUrl.pathname.startsWith('/blog') && // Allow access to blog page
        !request.nextUrl.pathname.startsWith('/auth') && // Allow access to auth-related pages
        !request.nextUrl.pathname.startsWith('/error') // Allow access to error page
    ) {
        console.log('Unauthenticated user trying to access restricted page, redirecting to login');
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    console.log('Request passed all checks, returning response');
    return supabaseResponse;
}