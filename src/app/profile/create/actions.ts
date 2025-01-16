"use server";
import { createClient } from "utils/supabase/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function createBlogPost(title: string, content: string, published: boolean) {
    
    const supabase = await createClient();

    const { data: { user }, error} = await supabase.auth.getUser();


    if (!user || error) {
        return {
            error: "Not authenticated to create post"
        }
    }

    try {
        await prisma.blogPost.create({
            data: {
                title: title,
                content: content,
                published: published,
                authorId: user.id
            }
        })

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                error: error.message
            }
        }
    }

}