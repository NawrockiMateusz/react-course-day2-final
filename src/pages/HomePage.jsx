import { FavoriteButton } from "../features/favorites/FavoriteButton"
import { WatchlistButton } from "../features/watchlist/WatchlistButton"

export default function HomePage() {
    const testMovie = { id: 1, title: 'Inception', poster_path: null }

    return (
        <div>
            <h2 className="text-2xl mb-4">Strona główna</h2>
            <FavoriteButton movie={testMovie} />
            <WatchlistButton movie={testMovie} />
        </div>
    )
}