import { redirect } from 'next/navigation';
import { createClient } from 'utils/supabase/server';
import { resetPassword } from '@/app/forgot-password/actions';
import { EmailOtpType } from '@supabase/supabase-js';

export default async function ResetPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ token_hash?: string; type?: string }>
}) {
    const params = await searchParams;
    const token_hash = params.token_hash;
    const type = params.type as EmailOtpType;
    
    console.log(token_hash, type);
    if (!token_hash || !type) {
        redirect('/error');
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type
    });

    if (error) {
        console.error("OTP verification error:", error);
        redirect('/error');
    }

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <form
                className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                action={resetPassword}
            >
                <label className="text-md" htmlFor="password">
                    New Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="password"
                    type="password"
                    required
                />

                <label className="text-md" htmlFor="confirmPassword">
                    Confirm Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="confirmPassword"
                    type="password"
                    required
                />

                <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
                    Reset Password
                </button>
            </form>
        </div>
    );
}