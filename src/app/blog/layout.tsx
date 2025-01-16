import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog Posts',
    description: 'Read our latest blog posts',
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 