"use server";

import { Suspense } from 'react';
import BlogPostSkeleton from './components/BlogPostSkeleton';
import BlogPosts from './components/BlogPosts';

export default async function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
            <Suspense fallback={<BlogPostsLoading />}>
                <BlogPosts />
            </Suspense>
        </div>
    );
}

function BlogPostsLoading() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <BlogPostSkeleton key={i} />
            ))}
        </div>
    );
}