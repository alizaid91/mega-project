import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";

const weatherStore = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default weatherStore;
