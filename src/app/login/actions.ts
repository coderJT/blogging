'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


import { createClient } from "utils/supabase/server";

export async function login(formData: FormData) {

    const supabase = await createClient();

    // TODO: Zod validation
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/', 'layout'); // reflect changes caused by user login on layout-level
    redirect('/');
}

export async function signup(formData: FormData) {

    const supabase = await createClient();

    // Require Zod validation
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/blog`
        }
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/', 'layout');
    redirect('/check-email');
}

