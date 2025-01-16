"use server";

import { PrismaClient } from "@prisma/client";
import { cache } from "react";

const prisma = new PrismaClient();

export const getBlogPost = cache(async (id: string) => {
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
        },
    });

    return post;
}); 