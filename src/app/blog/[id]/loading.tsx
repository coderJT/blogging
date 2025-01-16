export default function BlogPostLoading() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl animate-pulse">
            <div className="mb-8">
                <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>

            <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
        </div>
    );
} 