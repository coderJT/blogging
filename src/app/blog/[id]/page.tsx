"use client";

import { getBlogPost } from "./actions";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { use } from "react";
import { createClient } from "utils/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlogPostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const [post, setPost] = useState<any>(null);
    const [isOwner, setIsOwner] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        async function loadPost() {
            try {
                const post = await getBlogPost(id);
                if (!post) {
                    notFound();
                }
                setPost(post);

                // Check if current user is the post owner
                const { data: { user } } = await supabase.auth.getUser();
                setIsOwner(user?.id === post.authorId);
            } catch (error) {
                console.error('Error loading post:', error);
            }
        }

        loadPost();
    }, [id, supabase.auth]);

    if (!post) {
        return null; 
    }

    return (
        <article className="container mx-auto px-4 py-8 max-w-3xl">
            <header className="mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                        <div className="text-gray-500">
                            {formatDate(post.createdAt)}
                        </div>
                    </div>
                    {isOwner && (
                        <Link href={`/blog/${id}/edit`}>
                            <Button variant="outline">
                                Edit Post
                            </Button>
                        </Link>
                    )}
                </div>
            </header>

            <div className="prose prose-lg max-w-none">
                {post.content.split('\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4">
                        {paragraph}
                    </p>
                ))}
            </div>
        </article>
    );
}
