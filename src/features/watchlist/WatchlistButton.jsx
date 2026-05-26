import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../theme/ThemeContext";
import { addWatchlist, removeWatchlist } from "./watchlistSlice";

export function WatchlistButton({ movie }) {
    const dispatch = useDispatch();
    const { state } = useTheme();
    const dark = state.mode === 'dark';

    const isOnList = useSelector(s => s.watchlist.items.some(m => m.id === movie.id));

    return (
        <button
            onClick={() => dispatch(isOnList ? removeWatchlist(movie.id) : addWatchlist(movie))}
            className={`px-4 py-2 rounded text-lg transition-colors ${dark
                ? 'bg-zinc-700 hover:bg-zinc-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-zinc-900'
                }`}
        >
            {isOnList ? '📩 W watchliście' : '➕ Do obejrzenia'}
        </button>
    );
}