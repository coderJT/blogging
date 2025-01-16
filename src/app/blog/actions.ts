"use server";

import { PrismaClient } from "@prisma/client";
import { cache } from 'react';

const prisma = new PrismaClient();

export const getAllPosts = cache(async () => {
    const posts = await prisma.blogPost.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 10
    });

    return posts;
});    

