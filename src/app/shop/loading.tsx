export default function ShopLoading() {
    return (
        <div className="min-h-screen bg-[var(--background)] py-12">
            <div className="container-premium">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <div className="h-10 bg-gray-200 rounded-lg w-64 mb-4 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded-lg w-96 animate-pulse" />
                </div>

                {/* Products Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                            <div className="aspect-square bg-gray-200" />
                            <div className="p-4 space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 rounded w-1/2" />
                                <div className="h-10 bg-gray-200 rounded-lg w-full mt-4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
