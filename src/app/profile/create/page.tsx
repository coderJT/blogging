'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlogPost } from './actions';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function CreatePage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            if (!title.trim() || !content.trim()) {
                setError('Please fill in all required fields');
                return;
            }

            const result = await createBlogPost(title, content, published);

            if (result?.error) {
                setError(result.error);
            } else {
                router.push('/profile');
            }
        } catch (error) {
            setError('An error occurred while creating the post');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container max-w-2xl py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter post title"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write your post content"
                                className="min-h-[200px]"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="published"
                                checked={published}
                                onCheckedChange={setPublished}
                                disabled={isSubmitting}
                            />
                            <Label htmlFor="published">Publish immediately</Label>
                        </div>

                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}

                        <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Post'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}