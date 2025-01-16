"use client";

import { useEffect, useState } from "react";
import { getBlogPosts } from "./actions";
import BlogPostCard from "./components/BlogPostCard";
import { BlogFilters } from "@/components/BlogFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogPost } from "@/types/blog";

function BlogSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-[180px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-[300px]" />
                ))}
            </div>
        </div>
    );
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        async function loadPosts() {
            try {
                const fetchedPosts = await getBlogPosts();
                setPosts(fetchedPosts);
                setFilteredPosts(fetchedPosts);
            } catch (error) {
                console.error('Error loading posts:', error);
            } finally {
                setIsLoading(false);
            }
        }

        loadPosts();
    }, []);

    useEffect(() => {
        let result = [...posts];

        // Apply search filter
        if (searchQuery) {
            result = result.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply sorting
        result.sort((a, b) => {
            switch (sortBy) {
                case "oldest":
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case "views":
                    return b.viewCount - a.viewCount;
                case "newest":
                default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });

        setFilteredPosts(result);
    }, [posts, searchQuery, sortBy]);

    if (isLoading) {
        return <BlogSkeleton />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <BlogFilters
                onSearch={setSearchQuery}
                onSort={setSortBy}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        No posts found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
}