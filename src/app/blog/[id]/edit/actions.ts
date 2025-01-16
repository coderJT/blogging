"use server";

import { createClient } from "utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type UpdatePostData = {
    title: string;
    content: string;
    published: boolean;
}

export async function updateBlogPost(id: string, data: UpdatePostData) {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (!user || authError) {
        return {
            error: "Not authenticated to update post"
        }
    }

    try {
        const post = await prisma.blogPost.findUnique({
            where: { id }
        });

        if (!post || post.authorId !== user.id) {
            return {
                error: "Not authorized to edit this post"
            }
        }

        await prisma.blogPost.update({
            where: { id },
            data
        });

        revalidatePath('/blog');
        revalidatePath('/profile');
        
        return { success: true };
    } catch (error) {
        console.error("Error updating post:", error);
        return {
            error: "Failed to update post"
        }
    }
} 
