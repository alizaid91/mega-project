import { createSlice } from "@reduxjs/toolkit";

const staredList = {
  id: Date.now() + 9,
  name: "Stared",
  todos: [],
  completed: [],
};
const defaultList = {
  id: Date.now(),
  name: "Todos",
  todos: [],
  completed: [],
};

const todoSlice = createSlice({
  name: "todoList",
  initialState: [staredList, defaultList],
  reducers: {
    addTodo: (state, action) => {
      const { name, date, listId, description } = action.payload;

      const list = state.find((list) => list.id === listId);
      if (list) {
        const newTodo = {
          id: Date.now(),
          name: name,
          date: date || "",
          description: description || "",
        };
        list.todos.push(newTodo);
      }
    },
    markCompleted: (state, action) => {
      const { listId, todoId } = action.payload;

      let list = state.find((list) => list.id === listId);
      if (list) {
        const todo = list.todos.find((todo) => todo.id === todoId);
        list.todos = list.todos.filter((todo) => todo.id !== todoId && todo);
        list.completed.push(todo);
      }
    },
    createNewList: (state, action) => {
      const { name } = action.payload;
      const newList = {
        id: Date.now(),
        name: name,
        todos: [],
        completed: [],
      };
      state.push(newList);
    },
  },
});

export const { markCompleted, addTodo, createNewList } = todoSlice.actions;
export default todoSlice.reducer;
