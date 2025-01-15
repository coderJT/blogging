import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                
                setAll(cookiesToSet) {

                    // Pass refreshed auth token to server components
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))

                    // Create a NextResponse object while preserving the updated request
                    supabaseResponse = NextResponse.next({ request })

                    // Pass refreshed auth token to browser/client
                    cookiesToSet.forEach(({ name, value, options }) => 
                        supabaseResponse.cookies.set(name, value, options)
                    )
                }
            }
        }
    )

    const { 
        data: { user }
    } = await supabase.auth.getUser();

    // Prevents authenticated user from visiting login page
    if (user &&
        request.nextUrl.pathname.startsWith('/login') 
    ) {
        const url = request.nextUrl.clone()
        url.pathname = '/private'
        return NextResponse.redirect(url)
    }

    // Prevents unauthenticated user from visiting other pages than specified
    if ( 
        !user && // Check if there is no authenticated user
        !request.nextUrl.pathname.startsWith('/login') && // Allow access to the login page
        !request.nextUrl.pathname.startsWith('/forgot-password') && // Allow access to the forgot password page
        !request.nextUrl.pathname.startsWith('/check-email') && // Allow access to the check email page
        !request.nextUrl.pathname.startsWith('/reset-password') && // Allow access to reset password page
        !request.nextUrl.pathname.startsWith('/auth') // Allow access to auth-related pages
    ) {
        // Cloning is required to preserve other parts of the URL (if needed)
        const url = request.nextUrl.clone() 
        url.pathname = '/login'
        return NextResponse.redirect(url) 
    }

    return supabaseResponse;
}

