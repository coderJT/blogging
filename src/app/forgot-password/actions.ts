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

    const { error } = await supabase.auth.resetPasswordForEmail(email);

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
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password || !confirmPassword) {
        redirect("/error");
    }

    if (password !== confirmPassword) {
        redirect("/error");
    }

    const { error } = await supabase.auth.updateUser({
        password: password,
    })

    if (error) {
        redirect("/error");
    }


    redirect("/login");
}