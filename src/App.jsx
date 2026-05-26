import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import { PageSkeleton } from "./shared/components/PageSkeleton"
import Layout from "./pages/Layout"
import NotFoundPage from './pages/NotFoundPage';

const HomePage = lazy(() => import('./pages/HomePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const MoviePage = lazy(() => import('./pages/MoviePage'));
const FavoritesPage = lazy(() => import('./pages/FavortiesPage'));
const WatchlistPage = lazy(() => import('./pages/WatchlistPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="movie/:id" element={<MoviePage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="watchlist" element={<WatchlistPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
