"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login, signup } from "./actions";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {

    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (formData: FormData) => {
        setError(null);
        const result = await login(formData);
        if (result?.error) {
            setError(result.error);
        }
    }

    const handleSignup = async (formData: FormData) => {
        setError(null);
        const result = await signup(formData);
        if (result?.error) {
            setError(result.error);
        }
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                        Enter your email and password to login to your account.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">Email: </label>
                            <Input id="email" name="email" type="email" required />
                        </div>

                        <div className="flex flex-col gap-1 mt-2">
                            <label htmlFor="password">Password:</label>
                            <Input id="password" name="password" type="password" required />
                        </div>

                        {error && <p className="text-red-500 mt-2">{error}</p>}

                        <div className="flex gap-2 mt-6 mb-4">
                            <Button variant="outline" formAction={handleLogin}>Login</Button>
                            <Button variant="outline" formAction={handleSignup}>Sign up</Button>
                        </div>

                        <Link href="/forgot-password" className="text-sm underline text-gray-400">Forgot Password</Link>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}