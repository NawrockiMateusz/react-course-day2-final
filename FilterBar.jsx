import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { moviesApi } from '../../shared/api/movies';
import { useDebounce } from '../../shared/hooks/useDebounce';

export function FiltersBar() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Rok: lokalny stan + debounce — URL aktualizuje się dopiero po 600ms przerwy
    // Bez tego szukałoby po każdej cyfrze: '2', '20', '202', '2023'
    const [yearInput, setYearInput] = useState(searchParams.get('year') || '');
    const debouncedYear = useDebounce(yearInput, 600);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (debouncedYear && debouncedYear.length === 4) {
            params.set('year', debouncedYear);
        } else {
            params.delete('year');
        }
        setSearchParams(params, { replace: true }); // replace: historia nie puchnie
    }, [debouncedYear]);

    const { data: genresData } = useQuery({
        queryKey: ['genres'],
        queryFn: moviesApi.genres,
        staleTime: Infinity // lista gatunków się nie zmienia — nigdy nie odpytuj ponownie
    });

    const updateGenre = (value) => {
        const params = new URLSearchParams(searchParams);
        if (value) params.set('genre', value);
        else params.delete('genre');
        setSearchParams(params, { replace: true });
    };

    const hasFilters = searchParams.get('genre') || searchParams.get('year');

    return (
        <div className="flex gap-3 mb-6 flex-wrap items-center">
            <select
                value={searchParams.get('genre') || ''}
                onChange={e => updateGenre(e.target.value)}
                className="p-2 bg-zinc-800 text-white rounded border border-zinc-700"
            >
                <option value="">Wszystkie gatunki</option>
                {genresData?.genres.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                ))}
            </select>

            <input
                type="number"
                placeholder="Rok (np. 2023)"
                min="1900"
                max="2025"
                value={yearInput}
                onChange={e => setYearInput(e.target.value)}
                className="p-2 bg-zinc-800 text-white rounded border border-zinc-700 w-36"
            />

            {hasFilters && (
                <button
                    onClick={() => { setYearInput(''); setSearchParams({}); }}
                    className="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 rounded text-sm text-white"
                >
                    Wyczyść filtry ✕
                </button>
            )}
        </div>
    );
}
