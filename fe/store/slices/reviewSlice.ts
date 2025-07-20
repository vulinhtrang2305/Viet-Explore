import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://192.168.1.7:9999/reviews";

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(BASE_URL);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (
    {
      userId,
      spotId,
      rating,
      comment,
      imageUrl,
    }: {
      userId: string;
      spotId: string;
      rating: number;
      comment: string;
      imageUrl?: string[];
    },
    thunkAPI
  ) => {
    try {
      const res = await axios.post("http://192.168.1.7:9999/reviews/create", {
        userId,
        spotId,
        rating,
        comment,
        imageUrl: imageUrl || [], 
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Unknown error"
      );
    }
  }
);



// Slice
const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // CREATE
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default reviewsSlice.reducer;
