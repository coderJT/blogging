"use server";

import { getAllPosts } from '../actions';
import BlogPostCard from './BlogPostCard';

export default async function BlogPosts() {
    const posts = await getAllPosts();
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
            ))}
        </div>
    );
} 