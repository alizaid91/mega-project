import { createSlice } from "@reduxjs/toolkit";
import { useLocalStorage } from "../../utils/CustomHook";

const staredList = {
  id: Date.now() + 9,
  name: "Stared",
  todos: [],
};
const defaultList = {
  id: Date.now(),
  name: "Todos",
  todos: [],
  completed: [],
};

const todoSlice = createSlice({
  name: "todoList",
  initialState: JSON.parse(localStorage.getItem("TodoList")) || [
    staredList,
    defaultList,
  ],
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
      useLocalStorage("TodoList", state);
    },
    markCompleted: (state, action) => {
      const { listId, todoId } = action.payload;

      let list = state.find((list) => list.id === listId);
      if (list) {
        const todo = list.todos.find((todo) => todo.id === todoId);
        if (todo.listId) {
          let ogList = state.find((list) => list.id === todo.listId);
          ogList.todos = ogList.todos.filter((todo) => todo.id !== todoId);
          ogList.completed.push(todo);
        } else {
          list.todos = list.todos.filter((todo) => todo.id !== todoId && todo);
          list.completed.push(todo);
        }
        state[0].todos = state[0].todos.filter((todo) => todo.id !== todoId);
      }
      useLocalStorage("TodoList", state);
    },
    toggelStar: (state, action) => {
      const { listId, todoId } = action.payload;
      const list = state.find((list) => list.id === listId);
      if (list) {
        const todo = list.todos.find((todo) => todo.id === todoId);
        if (todo) {
          if (todo.starred) {
            todo.starred = false;
            state[0].todos = state[0].todos.filter(
              (STodo) => STodo.id !== todo.id
            );
            if (todo.listId) {
              const ogList = state.find((list) => list.id === todo.listId);
              const ogTodo = ogList.todos.find((tTodo) => tTodo.id === todo.id);
              ogTodo.starred = false;
            }
          } else {
            todo.starred = true;
            state[0].todos.push({ ...todo, listId: listId });
          }
        }
      }
      useLocalStorage("TodoList", state);
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
      useLocalStorage("TodoList", state);
    },
    deleteList: (state, action) => {
      const { listId } = action.payload;
      state = state.filter((list) => list.id !== listId);
      useLocalStorage("TodoList", state);
      return state;
    },
    renameList: (state, action) => {
      const { listId, newName } = action.payload;
      const list = state.find((list) => list.id === listId);
      list.name = newName;
      useLocalStorage("TodoList", state);
    },
    deleteCompletedTasks: (state, action) => {
      const { listId } = action.payload;
      const list = state.find((list) => list.id === listId);
      list.completed = [];
      useLocalStorage("TodoList", state);
    },
  },
});

export const {
  addTodo,
  markCompleted,
  toggelStar,
  createNewList,
  deleteList,
  renameList,
  deleteCompletedTasks,
} = todoSlice.actions;
export default todoSlice.reducer;
