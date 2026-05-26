import { useTheme } from "./ThemeContext";

export function ThemeToggle() {
    const { state, dispatch } = useTheme();
    const dark = state.mode === 'dark';

    return (
        <button
            onClick={() => dispatch({ type: 'TOGGLE' })}
            className={`ml-auto px-3 py-1 rounded transistion-colors ${dark ? 'bg-zinc-700 hover:bg-zinc-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-zinc-900'}`}
        >
            {dark ? 'Ustaw jasny' : 'Ustaw ciemny'}
        </button>
    )
}