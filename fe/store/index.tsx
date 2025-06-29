import { configureStore } from '@reduxjs/toolkit';
import spotReducer from './slices/spotSlice';
import categoriesReducer from './slices/categorySlice';
import reviewsReducer from './slices/reviewSlice';
import usersReducer from './slices/userSlice';
import suggestsReducer from './slices/suggestSlice';
import favouritesReducer from './slices/favouriteSlice';

export const store = configureStore({
    reducer: {
        spots: spotReducer,
        categories: categoriesReducer,
        reviews: reviewsReducer,
        users: usersReducer,
        suggests: suggestsReducer,
        favourites: favouritesReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
