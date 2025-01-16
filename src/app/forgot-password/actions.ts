"use server";

import { createClient } from "utils/supabase/server";
import { redirect } from "next/navigation";

export const forgotPassword = async (formData: FormData) => {

    // Required Zod validation
    const email = formData.get("email")?.toString();
    const supabase = await createClient();

    if (!email) {
        redirect("/error");
    }   

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `/reset-password`
    });

    console.log(error);

    if (error) {
        console.error("Password reset error:", error);
        redirect("/error");
    }

    redirect("/check-email");
}

export const resetPassword = async (formData: FormData) => {

    const supabase = await createClient();

    // Zod validation
    try {
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (!password || !confirmPassword) {
            console.error("Password or confirm password is missing");
            redirect("/error");
        }

        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            redirect("/error");
        }

        const { error } = await supabase.auth.updateUser({
            password: password,
        })

        if (error) {
            console.error("Error updating password:", error);
            redirect("/error");
        }
    } catch (error) {
        console.error("Password reset error:", error);
        redirect("/error");
    }

    redirect("/login");
}