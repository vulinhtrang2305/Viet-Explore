import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9999/favourites";

//  Get all favourites
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

//  Get favourites by userId
export const fetchFavouritesByUser = createAsyncThunk(
  "favourites/fetchFavouritesByUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add to favourite
export const addToFavourite = createAsyncThunk(
  "favourites/addToFavourite",
  async (
    { userId, spotId }: { userId: string; spotId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/add`, { userId, spotId });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete spot from favourite
export const deleteFavourite = createAsyncThunk(
  "favourites/deleteFavourite",
  async (
    { userId, spotId }: { userId: string; spotId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.delete(`${API_URL}/${userId}/${spotId}`);
      return {
        userId,
        spotId,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [], // all favourites (optional)
    userFavourite: null, // favourite object theo user
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
      //  Get all
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

      //  Get by user
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
        state.error = action.payload;
      })

      //  Add
      .addCase(addToFavourite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToFavourite.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Đã thêm vào mục ưa thích";

        // Cập nhật cả favourites và userFavourite nếu muốn
        const updated = state.favourites.find(
          (f) => f._id === action.payload._id
        );
        if (!updated) {
          state.favourites.push(action.payload);
        } else {
          updated.spotId = action.payload.spotId;
        }

        if (
          state.userFavourite &&
          state.userFavourite._id === action.payload._id
        ) {
          state.userFavourite.spotId = action.payload.spotId;
        }
      })
      .addCase(addToFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete spot from favourite
      .addCase(deleteFavourite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFavourite.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;

        const { spotId } = action.payload;

        // Cập nhật userFavourite
        if (state.userFavourite) {
          state.userFavourite.spotId = state.userFavourite.spotId.filter(
            (id) => id !== spotId
          );

          // Nếu sau khi xoá mà mảng rỗng thì xoá luôn object
          if (state.userFavourite.spotId.length === 0) {
            state.userFavourite = null;
          }
        }

        // Nếu có quản lý list favourites toàn cục
        state.favourites = state.favourites
          .map((fav) => {
            if (fav.userId === action.payload.userId) {
              const updatedSpotIds = fav.spotId.filter((id) => id !== spotId);
              if (updatedSpotIds.length === 0) {
                return null; // Hoặc filter ra ngoài
              }
              return { ...fav, spotId: updatedSpotIds };
            }
            return fav;
          })
          .filter(Boolean); // Xoá null nếu xoá hẳn bản ghi
      })
      .addCase(deleteFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetFavouriteMessage, resetFavouriteError } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
