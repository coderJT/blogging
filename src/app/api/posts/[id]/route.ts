import { createClient } from "utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function DELETE(
    request: NextRequest,
): Promise<NextResponse> {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id: string | undefined = searchParams.get('id') ?? undefined;
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get the post to check ownership
        const post = await prisma.blogPost.findUnique({
            where: { id: id },
            select: { authorId: true }
        });

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        // Check if the user is the author
        if (post.authorId !== user.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 403 }
            );
        }

        // Delete the post
        await prisma.blogPost.delete({
            where: { id: id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
} 