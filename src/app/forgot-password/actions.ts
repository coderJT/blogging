import { headers } from "next/headers";
import { createClient } from "utils/supabase/server";
import { redirect } from "next/navigation";

export const forgotPassword = async (formData: FormData) => {

    // Required Zod validation
    const email = formData.get("email")?.toString();
    const supabase = await createClient();
    const origin = (await headers()).get("origin");
    const callbackUrl = formData.get("callbackUrl")?.toString();

    if (!email) {
        redirect("/error");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?redirect_to=/private/reset-password`,
    });

    if (error) {
        redirect("/error");
    }

    if (callbackUrl) {
        redirect(callbackUrl);
    }

    // Redirect to proper message
    redirect("/login")
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