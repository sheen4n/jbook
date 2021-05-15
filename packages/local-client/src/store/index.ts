import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { persistMiddleware } from './middlewares/persist-middleware';
import { logger } from './middlewares/logger';

import cellsReducer from './cells';
import bundlesReducer from './bundles';
import api from './middlewares/api';

const rootReducer = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), logger, persistMiddleware, api],
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;
export type RootActions = Parameters<typeof cellsReducer>[1] | Parameters<typeof bundlesReducer>[1];
