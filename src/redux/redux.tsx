import { configureStore, createSlice } from "@reduxjs/toolkit";

interface Item {
  completed: boolean,
  id: number,
  text: string
}

interface TodoState {
  todos: Item[],
  filterBy: TFilters
}

type TFilters = 'ALL' | 'COMPLETED' | 'NOT_COMPLETED';

const Todo = createSlice({
    name: 'todos',
    initialState: {
      todos: [],
      filterBy: 'ALL',
    } satisfies TodoState as TodoState,
    reducers: (create) => ({
        addTodo: create.preparedReducer(
            (text: string) => {
            const id = Date.now();
            const completed = false;
            return { payload: { id, text, completed } }
          },

          (state, action) => {
            state.todos.push(action.payload)
          },
        ),

        deleteTodo: create.reducer<number>((state, action) => {
            state.todos.splice(state.todos.findIndex((todo) => todo.id === action.payload), 1);
          },
        ),

        toggleTodo(state, action) {
          const toggleTodoItem = state.todos.find(
            (todo) => todo.id === action.payload.id
          );
          if (toggleTodoItem) {
            toggleTodoItem.completed = !toggleTodoItem.completed;
          }
        },

        filterBy(state, action) {
          state.filterBy = action.payload
        },
    })
})

export const { addTodo, deleteTodo, filterBy, toggleTodo } = Todo.actions;

const store = configureStore({
    reducer: {
        todo: Todo.reducer,
    },
});

export type IRootState = ReturnType<typeof store.getState>;

export default store;