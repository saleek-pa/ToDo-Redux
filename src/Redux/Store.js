import { configureStore, createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    items: [
      {
        id: 1,
        title: "Task 1",
        completed: false,
      },
      {
        id: 2,
        title: "Task 2",
        completed: false,
      },
    ],
  },

  reducers: {
    addItem: (state, action) => {
      const newItem = {
        id: Date.now(),
        title: action.payload,
        completed: false,
      };
      state.items.push(newItem);
    },

    editItem: (state, action) => {
      const { id, title } = action.payload;
      const editedItem = state.items.find((item) => item.id === id);
      editedItem.title = title;
    },

    deleteItem: (state, action) => {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      state.items = newItems;
    },
  },
});

export const { addItem, editItem, deleteItem } = todoSlice.actions;

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});
