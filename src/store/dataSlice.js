import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
  user: true,
};

const dataSlice = createSlice({
  name: "allData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(fetchData.pending, (state, action) => {
        state.posts = action.payload;
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const fetchData = createAsyncThunk(
  "allData/fetchData",
  async (url, { signal, rejectWithValue }) => {
    try {
      const response = await fetch(url, { signal });
      if (!response.ok) {
        return rejectWithValue({
          message: `Ошибка ${response.status}`,
          status: response.status,
        });
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue({
        message:
          error.name === "AbortError" ? "Запрос отменен" : "Ошибка подключения",
        status: error.name === "AbortError" ? 0 : "NETWORK_ERROR",
      });
    }
  },
  {
    condition: (_, { getState }) => {
      const { user, isLoading, posts } = getState().data;
      if (!user || isLoading || posts.length > 0) return false;
      return true;
    },
  }
);

export const dataReducer = dataSlice.reducer;
