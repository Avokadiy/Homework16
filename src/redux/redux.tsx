import { configureStore, createSlice } from "@reduxjs/toolkit";

interface Item {
  id: number,
  text: string,
  done: boolean
}

interface TodoState {
  todos: Item[]
}

const Todo = createSlice({
    name: 'todos',
    initialState: {
      todos: [],
    } satisfies TodoState as TodoState,
    reducers: (create) => ({
        addTodo: create.preparedReducer(
            (text: string) => {
            const id = Date.now();
            const done = false;
            return { payload: { id, text, done } }
          },

          (state, action) => {
            state.todos.push(action.payload)
          },
        ),

        deleteTodo: create.reducer<number>((state, action) => {
            state.todos.splice(state.todos.findIndex((todo) => todo.id === action.payload), 1);
          },
        ),

        doneTodo: create.reducer<number>((state, action) => {
          let change = state.todos.find(todo => todo.id == action.payload);
          if (change) {
            if (change.done == false) {
              change.done = true;
            } else {
              change.done = false;
            }
          }
        }),

        filterTodo: create.reducer<boolean>((state, action) => {
          state.todos.map(todo => todo.done = action.payload);
        })
    })
})

export const {addTodo, deleteTodo, doneTodo, filterTodo} = Todo.actions;

const store = configureStore({
    reducer: {
        todo: Todo.reducer,
    },
});

export type IRootState = ReturnType<typeof store.getState>;

export default store;