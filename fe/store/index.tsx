import { configureStore } from '@reduxjs/toolkit';
import spotReducer from './slices/spotSlice';
import categoriesReducer from './slices/categorySlice';
import reviewsReducer from './slices/reviewSlice';
import usersReducer from './slices/userSlice';
import suggestsReducer from './slices/suggestSlice';

export const store = configureStore({
    reducer: {
        spots: spotReducer,
        categories: categoriesReducer,
        reviews: reviewsReducer,
        users: usersReducer,
        suggests: suggestsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
