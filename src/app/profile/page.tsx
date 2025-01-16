"use client";

import { useEffect, useState } from 'react';
import { createClient } from 'utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatDate } from '@/lib/utils';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from '@supabase/supabase-js';
import { BlogPost } from "@/types/blog";
import { getUserPosts } from "../blog/[id]/actions";

function ProfileSkeleton() {
    return (
        <div className="container max-w-5xl py-10">
            <div className="grid gap-8">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-[200px]" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <Skeleton className="h-4 w-[100px] mb-2" />
                                <Skeleton className="h-6 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-4 w-[120px] mb-2" />
                                <Skeleton className="h-6 w-[150px]" />
                            </div>
                            <div className="pt-4">
                                <Skeleton className="h-10 w-[150px]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <Skeleton className="h-8 w-[150px]" />
                        <Skeleton className="h-10 w-[140px]" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center justify-between py-4">
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-[300px]" />
                                        <div className="flex gap-4">
                                            <Skeleton className="h-4 w-[100px]" />
                                            <Skeleton className="h-4 w-[80px]" />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Skeleton className="h-9 w-[60px]" />
                                        <Skeleton className="h-9 w-[60px]" />
                                        <Skeleton className="h-9 w-[70px]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        async function getProfile() {
            setIsLoading(true);
            try {
                const { data: { user }, error: authError } = await supabase.auth.getUser();
                if (!user || authError) {
                    router.push('/login');
                    return;
                }
                setUser(user);

                const userId = user.id;
                const userPosts = await getUserPosts(userId);
                setPosts(userPosts);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setIsLoading(false);
            }
        }

        getProfile();
    }, [router, supabase.auth]);

    const handleDelete = async (postId: string) => {
        try {
            setIsDeleting(true);
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPosts(posts.filter(post => post.id !== postId));
            } else {
                console.error('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return <ProfileSkeleton />;
    }

    return (
        <div className="container max-w-5xl py-10">
            <div className="grid gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Email</label>
                                <p className="text-lg">{user?.email}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Member Since</label>
                                <p className="text-lg">{formatDate(new Date(user?.created_at ?? ''))}</p>
                            </div>
                            <div className="pt-4">
                                <Button variant="outline" asChild>
                                    <Link href="/reset-password">
                                        Change Password
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Your Posts</CardTitle>
                        <Button asChild>
                            <Link href="/profile/create">
                                Create New Post
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Updated</TableHead>
                                    <TableHead>Views</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell className="font-medium">{post.title}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                post.published 
                                                    ? 'bg-green-100 text-green-700' 
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {post.published ? 'Published' : 'Draft'}
                                            </span>
                                        </TableCell>
                                        <TableCell>{formatDate(new Date(post.createdAt))}</TableCell>
                                        <TableCell>{formatDate(new Date(post.updatedAt))}</TableCell>
                                        <TableCell>{post.viewCount}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/blog/${post.id}`}>
                                                    View
                                                </Link>
                                            </Button>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/blog/${post.id}/edit`}>
                                                    Edit
                                                </Link>
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        className="text-red-600 hover:text-red-700"
                                                        disabled={isDeleting}
                                                    >
                                                        Delete
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete your post.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(post.id)}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {posts.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                                            No posts yet. Create your first post!
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}