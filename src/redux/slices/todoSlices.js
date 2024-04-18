import { createSlice } from "@reduxjs/toolkit";

export const todoSlices = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    loading: false,
    selected: null,
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    todoDelete: (state,action)=>{
        const idToDelete = action.payload;
        state.todos = state.todos.filter(todo => todo.id !== idToDelete);
    }
  },
});

export const { setTodos, setLoading,setSelected,todoDelete } = todoSlices.actions;
export default todoSlices;
