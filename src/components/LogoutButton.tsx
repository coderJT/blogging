"use client";

import { createClient } from "utils/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <button
            onClick={handleSignOut}
            className="px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md"
        >
            Logout
        </button>
    );
} 