import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { moviesApi } from '../shared/api/movies';
import { MovieCard } from '../features/movies/MovieCard';
import { MovieCardSkeleton } from '../features/movies/MovieCardSkeleton';
import { FiltersBar } from '../features/filters/FiltersBar';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const genre = searchParams.get('genre');
  const year = searchParams.get('year');
  const hasFilters = genre || year;

  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', hasFilters ? 'discover' : 'popular', genre, year],
    queryFn: () => hasFilters
      ? moviesApi.discover({ with_genres: genre, primary_release_year: year })
      : moviesApi.popular()
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {hasFilters ? 'Wyniki filtrów' : 'Popularne filmy'}
      </h1>
      <FiltersBar />

      {error && <p className="text-red-400 mb-4">Błąd: {error.message}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => <MovieCardSkeleton key={i} />)
          : data?.results.map(m => <MovieCard key={m.id} movie={m} />)
        }
      </div>
    </div>
  );
}
