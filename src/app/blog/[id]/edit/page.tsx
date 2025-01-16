"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBlogPost } from '../actions';
import { updateBlogPost } from './actions';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createClient } from 'utils/supabase/client';
import { use } from 'react';
import Editor from '@/components/Editor';

export default function EditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params); 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {

        async function checkAuthAndLoadPost() {
            try {

                const { data: { user }, error: authError } = await supabase.auth.getUser();
                if (!user || authError) {
                    router.push('/login');
                    return;
                }

                const post = await getBlogPost(id);
                if (!post) {
                    router.push('/blog');
                    return;
                }

                if (post.authorId !== user.id) {
                    return;
                }

                setIsAuthorized(true);
                setTitle(post.title);
                setContent(post.content);
                setPublished(post.published);
            } catch (error) {
                console.error(error);
                setError('Failed to load post');
            } finally {
                setIsLoading(false);
            }
        }

        checkAuthAndLoadPost();
    }, [supabase.auth]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            if (!title.trim() || !content.trim()) {
                setError('Please fill in all required fields');
                return;
            }

            const result = await updateBlogPost(id, {
                title,
                content,
                published,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push('/blog');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred while updating the post');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="container max-w-2xl py-10">
                <Card>
                    <CardContent className="p-8">
                        Loading...
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!isAuthorized) {
        return (
            <div className="container max-w-2xl py-10">
                <Card>
                    <CardContent className="p-8 text-center">
                        <h2 className="text-xl font-semibold mb-2">Not Authorized</h2>
                        <p className="text-gray-500 mb-4">You don&apos;t have permission to edit this post.</p>
                        <Button onClick={() => router.push('/profile')} variant="outline">
                            Back to Profile
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container max-w-4xl py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter your post title"
                                disabled={isSubmitting}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Editor
                                value={content}
                                onChange={setContent}
                                placeholder="Write your post content here..."
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="published"
                                checked={published}
                                onCheckedChange={setPublished}
                                disabled={isSubmitting}
                            />
                            <Label htmlFor="published">Published</Label>
                        </div>

                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}

                        <div className="flex gap-2">
                            <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="flex-1"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </Button>
                            <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}