import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Spot {
    _id: string;
    name: string;
    description: string;
    region: string;
    regionGroup: string;
    regionCode: string;
    provinceId: string;
    categoryId: string;
    type: string;
    isFavorite: string;
    location: {
        lat: number;
        lng: number;
    };
    imageUrl: string[];
}

interface SpotState {
    spots: Spot[];
    loading: boolean;
    error: string | null;
}

const initialState: SpotState = {
    spots: [],
    loading: false,
    error: null,
};

export const fetchSpots = createAsyncThunk<Spot[]>(
    'spots/fetchSpots',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:9999/spots');
            return response.data.data; 
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const spotSlice = createSlice({
    name: 'spots',
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<string>) {
            const index = state.spots.findIndex((spot) => spot._id === action.payload);
            if (index !== -1) {
                state.spots[index].isFavorite = state.spots[index].isFavorite === 'true' ? 'false' : 'true';
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpots.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSpots.fulfilled, (state, action: PayloadAction<Spot[]>) => {
                state.loading = false;
                state.spots = action.payload;
            })
            .addCase(fetchSpots.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { toggleFavorite } = spotSlice.actions;
export default spotSlice.reducer;
