"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllPosts() {

    const posts = await prisma.blogPost.findMany();

    return posts;
}    

