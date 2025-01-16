import { Metadata } from "next";
import { getBlogPost } from "./actions";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const post = await getBlogPost(id);

    if (!post) {
        return {
            title: "Post Not Found",
            description: "The blog post you're looking for doesn't exist.",
        };
    }

    return {
        title: post.title,
        description: post.content.slice(0, 160) + "...",
    };
}

export default function BlogPostLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 