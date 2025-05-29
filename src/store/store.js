import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducer";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
