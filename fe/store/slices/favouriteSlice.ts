import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9999/favourites"; 

// Get all favourites
export const fetchFavourites = createAsyncThunk(
  "favourites/fetchFavourites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add to favourite
export const addToFavourite = createAsyncThunk(
  "favourites/addToFavourite",
  async ({ userId, spotId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/add`, { userId, spotId });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    resetFavouriteMessage: (state) => {
      state.message = null;
    },
    resetFavouriteError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(fetchFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = action.payload;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addToFavourite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToFavourite.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Đã thêm vào mục ưa thích";
        // Optionally update state.favourites nếu muốn push luôn
        const updated = state.favourites.find(
          (f) => f._id === action.payload._id
        );
        if (!updated) {
          state.favourites.push(action.payload);
        } else {
          updated.spotId = action.payload.spotId; // cập nhật spotId mới
        }
      })
      .addCase(addToFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetFavouriteMessage, resetFavouriteError } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
