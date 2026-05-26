import { NavLink, Outlet } from 'react-router';
import { ThemeToggle } from '../features/theme/ThemeToggle';
import { useTheme } from '../features/theme/ThemeContext';

export default function Layout() {
    const { state } = useTheme();
    const dark = state.mode === 'dark';

    return (
        <div className={`min-h-screen transition-colors ${dark ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-zinc-900'
            }`}>
            <nav className={`px-6 py-4 flex gap-6 items-center transition-colors ${dark ? 'bg-zinc-800' : 'bg-white border-b border-gray-200'
                }`}>
                <span className="font-bold text-amber-500 text-lg">🎬 MovieTracker</span>

                {[
                    { to: '/', label: 'Home' },
                    { to: '/search', label: 'Szukaj' },
                    { to: '/favorites', label: 'Ulubione' },
                    { to: '/watchlist', label: 'Do obejrzenia' },
                ].map(({ to, label }) => (
                    <NavLink key={to} to={to}
                        className={({ isActive }) =>
                            isActive
                                ? 'text-amber-500 font-semibold'
                                : dark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
                        }
                    >
                        {label}
                    </NavLink>
                ))}

                <ThemeToggle />
            </nav>

            <main className="p-6">
                <Outlet />
            </main>
        </div>
    );
}
