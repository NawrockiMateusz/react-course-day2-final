import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRating } from './ratingsSlice';
import { useTheme } from '../theme/ThemeContext';

export function StarRating({ movieId }) {
    const dispatch = useDispatch();
    const { state } = useTheme();
    const dark = state.mode === 'dark';

    const currentRating = useSelector(s => s.ratings[movieId] || 0);
    const [hovered, setHovered] = useState(0);

    return (
        <div className="flex gap-1 my-3 items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                <button
                    key={n}
                    onClick={() => dispatch(setRating({ movieId, rating: n }))}
                    onMouseEnter={() => setHovered(n)}
                    onMouseLeave={() => setHovered(0)}
                    className={`text-xl transition-colors ${n <= (hovered || currentRating)
                        ? 'text-amber-400'
                        : dark ? 'text-zinc-600' : 'text-gray-300'
                        }`}
                >
                    ★
                </button>
            ))}
            {currentRating > 0 && (
                <span className={`text-sm ml-2 ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    Twoja ocena: {currentRating}/10
                </span>
            )}
        </div>
    );
}