import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSuggests = createAsyncThunk(
  "suggests/fetchSuggests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:9999/suggests");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const suggestsSlice = createSlice({
  name: "suggests",
  initialState: {
    suggests: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggests.fulfilled, (state, action) => {
        state.loading = false;
        state.suggests = action.payload;
      })
      .addCase(fetchSuggests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default suggestsSlice.reducer;
