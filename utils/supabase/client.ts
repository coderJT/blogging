// Access Supabase from client components

import { createBrowserClient } from "@supabase/ssr";

// Usage of '!' to assure TS that env variables will always have a valuee
export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}