import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count++;
    },
    decrement: (state) => {
      state.count--;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
      console.log(action);
    },
    decrementByAmount: (state, action) => {
      state.count -= action.payload;
      console.log(action);
    },
  },
});

export const counterReducer = counterSlice.reducer;
export const { increment, decrement, incrementByAmount, decrementByAmount } =
  counterSlice.actions;
