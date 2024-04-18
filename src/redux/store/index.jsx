import { configureStore } from "@reduxjs/toolkit";
import todoSlices from "../slices/todoSlices";

export const store = configureStore({
  reducer: {
    todo: todoSlices.reducer,
  },
});


