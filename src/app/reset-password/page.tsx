import { resetPassword } from '@/app/forgot-password/actions';

export default async function ResetPasswordPage({
}: {
    searchParams: Promise<{ token_hash?: string, code?: string }>
}) {
    // If verification successful, show password reset form
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

                <button className="text-white bg-slate-700 rounded-md px-4 py-2 text-foreground mb-2">
                    Reset Password
                </button>
            </form>
        </div>
    );
}