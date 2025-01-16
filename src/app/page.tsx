"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "utils/supabase/client";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    }
    checkAuth();
  }, [supabase.auth]);

  return (
    <div className="container mx-auto px-4 py-16">

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to Blog.co
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Share your thoughts, connect with readers, and build your audience.
        </p>
        {!isAuthenticated && (
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link href="/login">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">Read Blog</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Write & Share</CardTitle>
            <CardDescription>
              Create beautiful blog posts and share them with the world
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our editor makes it easy to write, format, and publish your content.
              Support for markdown, images, and more.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engage Readers</CardTitle>
            <CardDescription>
              Build a community around your content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Connect with your audience through comments, likes, and shares.
              Grow your readership organically.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              Understand your audience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Get insights into your readership with detailed analytics.
              Track views, engagement, and growth over time.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to start writing?</CardTitle>
            <CardDescription>
              Join our community of writers and readers today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAuthenticated ? (
              <Button size="lg" asChild>
                <Link href="/profile/create">Create Your First Post</Link>
              </Button>
            ) : (
              <Button size="lg" asChild>
                <Link href="/login">Sign Up Now</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
