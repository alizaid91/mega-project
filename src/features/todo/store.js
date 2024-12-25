import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

const todoStore = configureStore({
  reducer: {
    todoList: todoReducer,
  },
});

export default todoStore;