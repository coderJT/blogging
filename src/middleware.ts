// This middleweare refreshes the auth token (through getUser), pass refreshed Auth token to server components (through request.cookies.set),
// passes refreshed auth token to browser to replace old token (response.cookies.set)

import { type NextRequest } from "next/server";
import { updateSession } from "utils/supabase/middleware";

export async function middleware(request: NextRequest) {
    return await updateSession(request);
}

// So that middleware does not run on routes that don't access supabase
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ]
}