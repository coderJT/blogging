import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: Promise<{
        id: string
    }>
}

export async function POST(
    request: NextRequest,
    props: Props
) {
    const params = await props.params;

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
        console.error('Error updating view count:', error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json(
            { error: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}

export async function GET(
    request: NextRequest,
    props: Props
) {
    const params = await props.params;

    try {
        const post = await prisma.blogPost.findUnique({
            where: { id: params.id },
            select: { viewCount: true }
        });

        if (!post) {
            return NextResponse.json(
                { viewCount: 0 },
                { status: 200 }
            );
        }

        return NextResponse.json({ viewCount: post.viewCount });
    } catch (error) {
        console.error('Error getting view count:', error instanceof Error ? error.message : 'Unknown error');
        return NextResponse.json(
            { error: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
} 