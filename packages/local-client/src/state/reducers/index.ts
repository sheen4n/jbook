import { combineReducers } from '@reduxjs/toolkit';
import cellsReducer from './cellsReducer';
import bundlesReducer from './bundlesReducer';

const rootReducer = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
