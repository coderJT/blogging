"use server";

import { createClient } from "utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        await supabase.auth.signOut();
    }

    // Redirect directly to login page
    return redirect('/login');
}