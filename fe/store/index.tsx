import { configureStore } from '@reduxjs/toolkit';
import spotReducer from './slices/spotSlice';

export const store = configureStore({
    reducer: {
        spots: spotReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
