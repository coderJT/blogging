import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null

    if (!token_hash || !type) {
        redirect('/error')
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type,
    })

    if (error) {
        console.error("Verification error:", error);
        redirect('/error')
    }

    return Response.redirect(new URL(`/reset-password?token_hash=${token_hash}&type=${type}`, request.url))
}