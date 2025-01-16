import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { createClient } from "utils/supabase/server";
import { LogoutButton } from "./LogoutButton";

export default async function Navbar() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className="w-full border-b border-b-foreground/10 h-16">
            <div className="w-full flex justify-between items-center h-full px-10">
                <Link href="/" className="font-bold text-2xl">
                    Blog.co
                </Link>

                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/blog" legacyBehavior passHref>
                                <NavigationMenuLink className="px-4 py-2">
                                    Blog
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        {user ? (
                            <>
                                <NavigationMenuItem>
                                    <Link href="/profile/create" legacyBehavior passHref>
                                        <NavigationMenuLink className="px-4 py-2">
                                            New Post
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link href="/profile" legacyBehavior passHref>
                                        <NavigationMenuLink className="px-4 py-2">
                                            Profile
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <LogoutButton />
                                </NavigationMenuItem>
                            </>
                        ) : (
                            <NavigationMenuItem>
                                <Link href="/login" legacyBehavior passHref>
                                    <NavigationMenuLink className="px-4 py-2">
                                        Login
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        )}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    );
} 