import { memo } from "react";

export const MovieCard = memo(function MovieCard({ movie }) {
    return (
        <div className="bg-zinc-800 rounded p-3">
            <div className="aspect-[2/3] bg-zinc-700 rounded mb-2 flex items-center justify-center text-zinc-500">
                🎬
            </div>
            <h3 className="text-sm font-bold truncate">{movie.title}</h3>
        </div>
    );
});