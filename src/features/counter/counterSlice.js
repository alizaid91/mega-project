import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => (state += 1),
    decrement: (state) => (state > 0 ? (state -= 1) : state),
    reset: (state) => 0,
    incrementByValue: (state, action) => (state += action.payload),
  },
});

export const { increment, decrement, reset, incrementByValue } = counterSlice.actions;
export default counterSlice.reducer;
