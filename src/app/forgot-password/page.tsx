"use client"

import { forgotPassword } from "./actions";
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();
    
    return (
        <button 
            className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2 disabled:opacity-50"
            disabled={pending}
        >
            {pending ? 'Sending...' : 'Send Reset Instructions'}
        </button>
    );
}

export default function ForgotPasswordPage() {
    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <form
                className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                action={forgotPassword}
            >
                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="email"
                    placeholder="you@example.com"
                    required
                />

                <SubmitButton />
            </form>
        </div>
    );
}