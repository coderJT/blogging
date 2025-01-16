import { getBlogPost } from "./actions";
import { formatDate } from "@/lib/utils";
import { Suspense } from "react";
import BlogPostLoading from "./loading";

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <Suspense fallback={<BlogPostLoading />}>
            <BlogPostContent id={id} />
        </Suspense>
    );
}

async function BlogPostContent({ id }: { id: string }) {
    const post = await getBlogPost(id);

    return (
        <article className="container mx-auto px-4 py-8 max-w-3xl">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="text-gray-500">
                    {formatDate(post.createdAt)}
                </div>
            </header>

            <div className="prose prose-lg max-w-none">
                {post.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                        {paragraph}
                    </p>
                ))}
            </div>
        </article>
    );
}
