"use server";

import { prisma } from '@/lib/prisma';
import { cache } from "react";
import { notFound } from "next/navigation";

export const getBlogPost = cache(async (id: string) => {
    try {
        const post = await prisma.blogPost.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                published: true,
                authorId: true,
                viewCount: true,
            },
        });

        if (!post) {
            return notFound();
        }

        return post;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        throw new Error('Failed to fetch blog post');
    }
}); 