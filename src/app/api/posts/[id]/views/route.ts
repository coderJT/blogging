import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest,
) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id') ?? undefined;
        const post = await prisma.blogPost.update({
            where: { id: id },
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
    request: NextRequest,
) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id') ?? undefined;
    try {
        const post = await prisma.blogPost.findUnique({
            where: { id: id },
            select: { viewCount: true }
        });

        return NextResponse.json({ viewCount: post?.viewCount ?? 0 });
    } catch (error) {
        console.error('Error getting view count:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 