export default function ProductLoading() {
    return (
        <div className="min-h-screen bg-[var(--background)] py-12">
            <div className="container-premium">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Skeleton */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse" />
                        <div className="grid grid-cols-4 gap-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                            ))}
                        </div>
                    </div>

                    {/* Details Skeleton */}
                    <div className="space-y-6">
                        <div className="h-10 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
                        <div className="h-6 bg-gray-200 rounded-lg w-1/2 animate-pulse" />
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                        </div>
                        <div className="h-12 bg-gray-200 rounded-lg w-full animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}
