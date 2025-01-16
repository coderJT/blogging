import { createClient } from "utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const posts = await prisma.blogPost.findMany({
            where: {
                authorId: user.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 