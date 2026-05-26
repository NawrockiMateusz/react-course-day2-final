export function PageSkeleton() {
    return (
        <div className="min-h-screen bg-zinc-900 p-6 animate-pulse">
            <div className="h-8 w-48 bg-zinc-700 rounded mb-6" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i}>
                        <div className="aspect-[2/3] bg-zinc-700 rounded" />
                        <div className="h-3 bg-zinc-700 rounded mt-2 w-3/4" />
                        <div className="h-3 bg-zinc-700 rounded mt-1 w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    );
}