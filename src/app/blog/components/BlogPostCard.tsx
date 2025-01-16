"use client";

import Link from 'next/link';
import { Post } from '@/types/blog';

export default function BlogPostCard({ post }: { post: Post }) {
    const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Link 
            href={`/blog/${post.id}`}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
            <article>
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                    {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.content}
                </p>
                <div className="text-sm text-gray-500">
                    {formattedDate}
                </div>
            </article>
        </Link>
    );
} 