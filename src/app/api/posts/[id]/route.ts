import { createClient } from "utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if post exists and belongs to user
        const post = await prisma.blogPost.findUnique({
            where: { id: params.id }
        });

        if (!post || post.authorId !== user.id) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
        }

        // Delete the post
        await prisma.blogPost.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 