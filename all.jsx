//SearchPage.jsx
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '../shared/hooks/useDebounce';
import { moviesApi } from '../shared/api/movies';
import { MovieCard } from '../features/movies/MovieCard';
import { MovieCardSkeleton } from '../features/movies/MovieCardSkeleton';

export default function SearchPage() {
  // Stan wyszukiwania w URL — można kopiować link z wynikami, działa przycisk wstecz
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const debouncedQuery = useDebounce(query, 400);

  const { data, isLoading } = useQuery({
    queryKey: ['movies', 'search', debouncedQuery],
    queryFn: () => moviesApi.search(debouncedQuery),
    enabled: debouncedQuery.length > 1,  // nie wysyłaj dla pustego inputa
    placeholderData: prev => prev         // stare wyniki podczas nowego requestu
  });

  return (
    <div>
      <input
        value={query}
        onChange={e => setSearchParams({ q: e.target.value })}
        placeholder="Szukaj filmu..."
        className="w-full p-3 mb-6 bg-zinc-800 text-white rounded text-lg"
        autoFocus
      />

      {data?.results.length === 0 && (
        <p className="text-zinc-400">Brak wyników dla "{debouncedQuery}"</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => <MovieCardSkeleton key={i} />)
          : data?.results.map(m => <MovieCard key={m.id} movie={m} />)
        }
      </div>
    </div>
  );
}
//MoviePage.jsx
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { moviesApi, tmdbImage } from '../shared/api/movies';
import { MovieCard } from '../features/movies/MovieCard';
import { FavoriteButton } from '../features/favorites/FavoriteButton';
import { WatchlistButton } from '../features/watchlist/WatchlistButton';
import { StarRating } from '../features/ratings/StarRating';

export default function MoviePage() {
  const { id } = useParams(); // bierze :id z URL, np. /movie/27205

  const { data: movie, isLoading } = useQuery({
    queryKey: ['movies', 'details', id],
    queryFn: () => moviesApi.details(id),
    enabled: !!id
  });

  if (isLoading) return <p className="text-zinc-400">Ładuję...</p>;
  if (!movie) return <p className="text-red-400">Nie znaleziono filmu.</p>;

  return (
    <article>
      {/* React 19: <title> w komponencie aktualizuje tytuł zakładki przeglądarki */}
      <title>{movie.title} – MovieTracker</title>

      <div className="flex gap-8 mb-10 flex-wrap">
        <img
          src={tmdbImage(movie.poster_path, 'w342')}
          alt={movie.title}
          className="w-56 rounded flex-shrink-0"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-zinc-400 text-sm mb-1">
            {movie.release_date?.slice(0, 4)} · {movie.runtime} min
          </p>
          <p className="text-amber-500 mb-4">⭐ {movie.vote_average?.toFixed(1)} / 10</p>
          <p className="text-zinc-300 mb-6 max-w-xl">{movie.overview}</p>

          <div className="flex flex-wrap gap-3">
            <FavoriteButton movie={movie} />
            <WatchlistButton movie={movie} />
          </div>
          <StarRating movieId={movie.id} />
        </div>
      </div>

      {movie.credits?.cast?.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4">Obsada</h2>
          <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
            {movie.credits.cast.slice(0, 12).map(person => (
              <div key={person.id}>
                {person.profile_path ? (
                  <img
                    src={tmdbImage(person.profile_path, 'w185')}
                    alt={person.name}
                    className="w-full rounded aspect-[2/3] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[2/3] bg-zinc-700 rounded flex items-center justify-center text-3xl">
                    👤
                  </div>
                )}
                <p className="text-sm mt-1 font-medium">{person.name}</p>
                <p className="text-xs text-zinc-400">{person.character}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {movie.similar?.results?.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4">Podobne filmy</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.similar.results.slice(0, 12).map(m => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </>
      )}
    </article>
  );
}

//FavoritesPage.jsx

import { useSelector } from 'react-redux';
import { MovieCard } from '../features/movies/MovieCard';

export default function FavoritesPage() {
  const favorites = useSelector(s => s.favorites.items);

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20 text-zinc-400">
        <p className="text-5xl mb-4">🤍</p>
        <p>Brak ulubionych. Wejdź na stronę filmu i kliknij serduszko.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Ulubione ({favorites.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {favorites.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
}
//WatchlistPage.jsx
import { useSelector } from 'react-redux';
import { MovieCard } from '../features/movies/MovieCard';

export default function WatchlistPage() {
  const watchlist = useSelector(s => s.watchlist.items);

  if (watchlist.length === 0) {
    return (
      <div className="text-center py-20 text-zinc-400">
        <p className="text-5xl mb-4">🔖</p>
        <p>Lista pusta. Wejdź na stronę filmu i kliknij "+ Do obejrzenia".</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Do obejrzenia ({watchlist.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {watchlist.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
}
