import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
const todos = [
  {
    id: 1,
    text: 'Todo 1',
    isCompleted: false,
  },
  {
    id: 2,
    text: 'Todo 2',
    isCompleted: false,
  },
];

const compareTodoIds = (a, b) => {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
};

const addOneTodo = (todoItems, newItem) => {
  if (todoItems.length === 0) {
    return [newItem];
  }
  return [...todoItems, newItem];
};

const updateTodoItemStatus = (todoItem) => {
  return {
    id: todoItem.id,
    text: todoItem.text,
    isCompleted: !todoItem.isCompleted,
  };
};

const updateTodoItem = (todoItems, todoItem) => {
  const todoMatch = todoItems.find((item) => item.id === todoItem.id);
  const updatedTodo = updateTodoItemStatus(todoMatch);
  const remainingTodos = todoItems.filter((item) => item.id !== todoMatch.id);
  return [...remainingTodos, updatedTodo];
};

const filteredTodoItems = (displayedTodoItems, filter) => {
  switch (filter) {
    case 'All':
      return displayedTodoItems;
    case 'Active':
      return displayedTodoItems.filter((item) => item.isCompleted !== true);
    case 'Completed':
      return displayedTodoItems.filter((item) => item.isCompleted === true);
    default:
      throw new Error(`filter of type ${filter} is not valid`);
  }
};

const initialState = {
  todoItems: todos,
  displayedTodoItems: todos,
  todoFilter: 'All',
};

export const todoItemsSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodoItem: (state, action) => {
      const todos = addOneTodo(state.todoItems, action.payload);
      state.todoItems = todos;
      const filteredTodos = filteredTodoItems(todos, state.todoFilter);
      const sortedTodos = filteredTodos.sort(compareTodoIds);
      state.displayedTodoItems = sortedTodos;
    },
    toggleIsCompleted: (state, action) => {
      const todos = updateTodoItem(state.todoItems, action.payload);
      state.todoItems = todos;
      const filteredTodos = filteredTodoItems(todos, state.todoFilter);
      const sortedTodos = filteredTodos.sort(compareTodoIds);
      state.displayedTodoItems = sortedTodos;
    },
    removeTodoItem: (state, action) => {
      const remainingTodos = state.todoItems.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.todoItems = remainingTodos;
      const filteredTodos = filteredTodoItems(remainingTodos, state.todoFilter);
      const sortedTodos = filteredTodos.sort(compareTodoIds);
      state.displayedTodoItems = sortedTodos;
    },
    clearCompletedTodoItems: (state, action) => {
      const remainingTodos = state.todoItems.filter((item) => {
        return item.isCompleted !== true;
      });
      state.todoItems = remainingTodos;
      const filteredTodos = filteredTodoItems(remainingTodos, state.todoFilter);
      const sortedTodos = filteredTodos.sort(compareTodoIds);
      state.displayedTodoItems = sortedTodos;
    },
    setTodoFilter: (state, action) => {
      console.log('action.payload filter: ', action.payload);
      state.todoFilter = action.payload;
      const filteredTodos = filteredTodoItems(
        state.todoItems,
        state.todoFilter
      );
      const sortedTodos = filteredTodos.sort(compareTodoIds);
      state.displayedTodoItems = sortedTodos;
    },
  },
});

export const {
  addTodoItem,
  toggleIsCompleted,
  removeTodoItem,
  clearCompletedTodoItems,
  setTodoFilter,
} = todoItemsSlice.actions;
export const todoReducer = todoItemsSlice.reducer;

export const selectTodoItemsReducer = (state) => state.todo;

export const selectTodoItems = createSelector(
  [selectTodoItemsReducer],
  (todo) => todo.todoItems
);

export const selectDisplayedTodoItems = createSelector(
  [selectTodoItemsReducer],
  (todo) => todo.displayedTodoItems
);

export const selectTodoItemsCount = createSelector(
  [selectTodoItems],
  (todoItems) => {
    const remainingTodoItems = todoItems.filter(
      (item) => item.isCompleted !== true
    );
    return remainingTodoItems.length;
  }
);

export const selectTodoItemsFilter = createSelector(
  [selectTodoItemsReducer],
  (todo) => todo.todoFilter
);

export const selectNextTodoId = createSelector(
  [selectTodoItems],
  (todoItems) => {
    const sortedItems = todoItems.slice().sort(compareTodoIds);
    try {
      const { id } = sortedItems.slice(-1).shift();
      return id + 1;
    } catch {
      return 1;
    }
  }
);
