import { createSlice } from "@reduxjs/toolkit";

const ratingsSlice = createSlice({
    name: 'raitings',
    initialState: JSON.parse(localStorage.getItem('ratings') || '{}'),
    reducers: {
        setRating(state, action) {
            state[action.payload.movieId] = action.payload.rating;
        },
        removeRating(state, action) {
            delete state[action.payload];
        }
    }
});

export const { setRating, removeRating } = ratingsSlice.actions;
export default ratingsSlice.reducer;