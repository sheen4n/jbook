import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { persistMiddleware } from './middlewares/persist-middleware';
import { logger } from './middlewares/logger';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), logger, persistMiddleware],
});
