import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "Blog.co",
        template: "%s | Blog.co"
    },
    description: "A modern blogging platform for sharing your thoughts and ideas.",
    keywords: ["blog", "writing", "articles", "content", "platform"],
    authors: [{ name: "Blog.co Team" }],
    creator: "Blog.co",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://blog.co",
        siteName: "Blog.co",
        title: "Blog.co - Share Your Thoughts",
        description: "A modern blogging platform for sharing your thoughts and ideas.",
        images: [
            {
                url: "/logo.png",
                width: 1200,
                height: 630,
                alt: "Blog.co"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog.co",
        description: "A modern blogging platform for sharing your thoughts and ideas.",
        images: ["/logo.png"],
        creator: "@blog_co"
    },
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                <main className="min-h-screen flex flex-col items-center">
                    {children}
                </main>
            </body>
        </html>
    );
}
