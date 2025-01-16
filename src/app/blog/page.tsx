"use client";

import { useEffect, useState } from "react";
import { getAllPosts } from "./actions";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
export default function BlogPost() {

    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        async function fetchAllPosts() {
            const posts = await getAllPosts();
            setPosts(posts);
        }
        fetchAllPosts();
    }, [])
    
    return (
        <div>
            <h1>Blog Posts</h1>
            <div className="flex justify-between items-start">
                <div>
                   {posts && posts.map((post: any) => (
                    <Card key={post.id}>
                        <CardHeader>
                            <CardTitle>{post.title}</CardTitle>
                            <CardDescription>{post.description}</CardDescription>
                        </CardHeader>
                    </Card>
                   ))}
                </div>
            </div>
        </div>
    )
}