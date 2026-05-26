import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from '../features/favorites/favoritesSlice'
import watchlistReducer from '../features/watchlist/watchlistSlice'
import ratingsReducer from '../features/ratings/ratingsSlice'

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        watchlist: watchlistReducer,
        ratings: ratingsReducer
    }
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('favorites', JSON.stringify(state.favorites.items));
    localStorage.setItem('watchlist', JSON.stringify(state.watchlist.items));
    localStorage.setItem('ratings', JSON.stringify(state.ratings));
});