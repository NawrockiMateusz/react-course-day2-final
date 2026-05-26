import { createSlice } from '@reduxjs/toolkit';

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: {
        items: JSON.parse(localStorage.getItem('watchlist') || '[]')
    },
    reducers: {
        addWatchlist(state, action) {
            const exists = state.items.find(m => m.id === action.payload.id);
            if (!exists) state.items.push(action.payload);
        },
        removeWatchlist(state, action) {
            state.items = state.items.filter(m => m.id !== action.payload);
        },
        clearWatchlist(state) {
            state.items = [];
        }
    }
});

export const { addWatchlist, removeWatchlist, clearWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;