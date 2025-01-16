"use server";

import { prisma } from '@/lib/prisma';
import { cache } from "react";
import { notFound } from "next/navigation";
import { BlogPost } from '@/types/blog';

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

export async function incrementBlogPostViews(id: string): Promise<number> {
    try {
        // Increment the view count in the database
        const updatedPost = await prisma.blogPost.update({
            where: { id },
            data: {
                viewCount: {
                    increment: 1, // Increment the view count by 1
                },
            },
            select: {
                viewCount: true, // Return the updated view count
            },
        });

        return updatedPost.viewCount; // Return the new view count
    } catch (error) {
        console.error('Error incrementing view count:', error);
        throw new Error('Failed to increment view count');
    }
}

export async function getUserPosts(userId: string): Promise<BlogPost[]> {
    try {
        const posts = await prisma.blogPost.findMany({
            where: { authorId: userId },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                published: true,
                viewCount: true,
                authorId: true,
            },
        });
        return posts;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw new Error('Failed to fetch user posts');
    }
} 