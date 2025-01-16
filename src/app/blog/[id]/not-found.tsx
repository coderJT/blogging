import Link from "next/link";

export default function BlogPostNotFound() {
    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="mb-8">
                Sorry, the blog post you're looking for doesn't exist.
            </p>
            <Link 
                href="/blog" 
                className="text-blue-500 hover:text-blue-600 underline"
            >
                Back to Blog Posts
            </Link>
        </div>
    );
} 