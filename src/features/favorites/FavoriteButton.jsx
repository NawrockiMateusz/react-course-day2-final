import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../theme/ThemeContext";
import { addFavorite, removeFavorite } from "./favoritesSlice";

export function FavoriteButton({ movie }) {
    const dispatch = useDispatch();
    const { state } = useTheme();
    const dark = state.mode === 'dark';

    const isFav = useSelector(s => s.favorites.items.some(m => m.id === movie.id));

    return (
        <button
            onClick={() => dispatch(isFav ? removeFavorite(movie.id) : addFavorite(movie))}
            className={`px-4 py-2 rounded text-lg transition-colors ${dark
                ? 'bg-zinc-700 hover:bg-zinc-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-zinc-900'
                }`}
        >
            {isFav ? '❤️ W ulubionych' : '🤍 Dodaj do ulubionych'}
        </button>
    );
}