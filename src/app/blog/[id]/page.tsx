"use client";

import { getBlogPost } from "./actions";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { use } from "react";
import { createClient } from "utils/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Post } from "@/types/blog";

export default function BlogPostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const [post, setPost] = useState<Post | null>(null);
    const [isOwner, setIsOwner] = useState(false);
    const [viewCount, setViewCount] = useState(0);
    const supabase = createClient();

    useEffect(() => {
        async function loadPost() {
            try {
                const post = await getBlogPost(id);
                if (!post) {
                    notFound();
                }
                setPost(post);

                const { data: { user } } = await supabase.auth.getUser();
                const isOwner = user?.id === post.authorId;
                setIsOwner(isOwner);

                const viewResponse = await fetch(`/api/posts/${id}/views`);
                const viewData = await viewResponse.json();
                setViewCount(viewData.viewCount);

                if (user?.id !== post.authorId) {
                    await fetch(`/api/posts/${id}/views`, { method: 'POST' });
                }
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
                        <div className="flex items-center gap-4 text-gray-500">
                            <time>{formatDate(post.createdAt)}</time>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {viewCount} views
                            </div>
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

            <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    );
}
