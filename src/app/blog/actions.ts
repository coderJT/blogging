"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "utils/supabase/server";

export async function getBlogPosts() {
    try {
        const posts = await prisma.blogPost.findMany({
            where: {
                published: true  
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                published: true,
                authorId: true,
                viewCount: true
            }
        });

        return posts;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export async function getBlogPost(id: string) {
    try {
        // First try to get published post
        const post = await prisma.blogPost.findFirst({
            where: { 
                id,
                published: true
            }
        });

        // If no published post found, check if user is the author
        if (!post) {
            const supabase = await createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // If user is logged in, check if they're the author
                const draftPost = await prisma.blogPost.findFirst({
                    where: { 
                        id,
                        authorId: user.id
                    }
                });
                return draftPost;
            }
        }

        return post;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}    

