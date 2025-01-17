"use server";

import { createClient } from "utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET() {
    const supabase = await createClient();
    
    console.log("Signout route handler triggered.");

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) {
        console.error("Error fetching user:", userError);
    }

    if (user) {
        console.log("User found:", user.email);
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error during signOut:", error);
        } else {
            console.log("User signed out successfully.");
        }
    } else {
        console.log("No user session found.");
    }

    console.log("Redirecting to /login.");
    return redirect('/login');
}