import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const BASE_URL = "http://localhost:9999/favourites";
const API_URL = "http://192.168.1.7:9999/favourites";

// Lấy danh sách yêu thích của user
export const fetchFavouritesByUser = createAsyncThunk(
  "favourites/fetchFavouritesByUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      return response.data.data; // { userId, spotId: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thêm địa điểm yêu thích
export const addToFavourite = createAsyncThunk(
  "favourites/addToFavourite",
  async (
    { userId, spotId }: { userId: string; spotId: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.post(`${API_URL}/add`, { userId, spotId });
      return { userId, spotId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Xóa địa điểm khỏi yêu thích
export const deleteFavourite = createAsyncThunk(
  "favourites/deleteFavourite",
  async (
    { userId, spotId }: { userId: string; spotId: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      await axios.delete(`${API_URL}/${userId}/${spotId}`);

      dispatch(fetchFavouritesByUser(userId));

      return { userId, spotId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const favouriteSlice = createSlice({
  name: "favourites",
  initialState: {
    userFavourite: null as { userId: string; spotId: string[] } | null,
    loading: false,
    error: null as string | null,
    message: null as string | null,
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
      // FETCH
      .addCase(fetchFavouritesByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavouritesByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userFavourite = action.payload;
      })
      .addCase(fetchFavouritesByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.userFavourite = { userId: "", spotId: [] };
      })

      // ADD
      .addCase(addToFavourite.fulfilled, (state, action) => {
        const { spotId } = action.payload;
        if (state.userFavourite) {
          if (!state.userFavourite.spotId.includes(spotId)) {
            state.userFavourite.spotId.push(spotId);
            state.message = "Đã thêm vào mục yêu thích";
          }
        } else {
          state.userFavourite = {
            userId: action.payload.userId,
            spotId: [spotId],
          };
          state.message = "Đã thêm vào mục yêu thích";
        }
      })
      .addCase(addToFavourite.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // DELETE
      .addCase(deleteFavourite.fulfilled, (state, action) => {
        state.message = "Đã xóa khỏi mục yêu thích";
      })
      .addCase(deleteFavourite.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { resetFavouriteMessage, resetFavouriteError } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
