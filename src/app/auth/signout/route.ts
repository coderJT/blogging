"use server";

import { createClient } from "utils/supabase/server";
import { revalidatePath } from "next/cache";    
import { redirect } from "next/navigation";

export async function GET() {
    const supabase = await createClient();
    const { 
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        await supabase.auth.signOut({scope: 'local'});
    }
    revalidatePath('/login', 'layout');
    redirect('/login');
}