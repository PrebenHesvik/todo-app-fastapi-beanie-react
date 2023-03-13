import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { todoReducer } from './todo/todoSlice';
import { themeReducer } from './theme/themeSlice';

const middlewares = [process.env.NODE_ENV !== 'production' && logger].filter(
  Boolean
);

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});
