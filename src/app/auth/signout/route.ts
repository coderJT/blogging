"use server";

import { createClient } from "utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    // Log the request details to track who is calling this route
    console.log("Signout route handler triggered.");
    console.log("Request Details:", {
        method: request.method,
        url: request.url,
        headers: {
            "user-agent": request.headers.get("user-agent"),  // Log user-agent for identifying the client
            "x-forwarded-for": request.headers.get("x-forwarded-for"), // Log the IP address (if provided by proxy)
            "authorization": request.headers.get("authorization") // Log the authorization header (if any)
        }
    });

    const supabase = await createClient();

    // Log the client creation process
    console.log("Supabase client created.");

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) {
        console.error("Error fetching user:", userError);
    }

    // Log if a user is found or not
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

    // Log the redirect process
    console.log("Redirecting to /login.");

    return redirect('/login');
}