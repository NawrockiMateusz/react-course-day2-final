import { memo } from 'react';
import { Link } from 'react-router';
import { tmdbImage } from '../../shared/api/movies';

export const MovieCard = memo(function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="block group">
      {movie.poster_path ? (
        <img
          src={tmdbImage(movie.poster_path, 'w342')}
          alt={movie.title}
          className="w-full rounded aspect-[2/3] object-cover group-hover:opacity-80 transition-opacity"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-zinc-700 rounded flex items-center justify-center text-4xl">
          🎬
        </div>
      )}
      <h3 className="mt-2 text-sm font-bold truncate">{movie.title}</h3>
      <p className="text-amber-500 text-xs">⭐ {movie.vote_average?.toFixed(1)}</p>
    </Link>
  );
});
