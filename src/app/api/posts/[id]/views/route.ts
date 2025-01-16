import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const post = await prisma.blogPost.update({
            where: { id: params.id },
            data: {
                viewCount: {
                    increment: 1
                }
            }
        });

        return NextResponse.json({ viewCount: post.viewCount });
    } catch (error) {
        console.error('Error updating view count:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const post = await prisma.blogPost.findUnique({
            where: { id: params.id },
            select: { viewCount: true }
        });

        return NextResponse.json({ viewCount: post?.viewCount ?? 0 });
    } catch (error) {
        console.error('Error getting view count:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 