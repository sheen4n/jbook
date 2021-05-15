import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { apiCallBegan } from './api';
import { RootActions, RootState } from './index';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

type Direction = 'up' | 'down';

type CellTypes = 'code' | 'text';

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}

// ------
// Reducers
// uses immer under the hood for mutable code
const slice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    cellsRequested: (state) => {
      state.loading = true;
      state.error = null;
    },
    cellsRequestFailed: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    cellsReceived: (state, action: PayloadAction<Cell[]>) => {
      state.order = action.payload.map((cell) => cell.id);
      state.data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellsState['data']);
    },
    cellsSaveError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload.message;
    },
    cellUpdated: (
      state,
      action: PayloadAction<{
        id: string;
        content: string;
      }>,
    ) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },

    cellDeleted: (state, action: PayloadAction<string>) => {
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
    },
    cellMoved: (
      state,
      action: PayloadAction<{
        id: string;
        direction: Direction;
      }>,
    ) => {
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
    },
    cellInsertedAfter: (state, action: PayloadAction<{ id: string | null; type: CellTypes }>) => {
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId(),
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex((id) => id === action.payload.id);

      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }
    },
  },
});

const { cellsSaveError, cellsRequested, cellsRequestFailed, cellsReceived } = slice.actions;
export const { cellMoved, cellInsertedAfter, cellUpdated, cellDeleted } = slice.actions;

const url = '/cells';

export const saveCells = () => (dispatch: Dispatch<RootActions>, getState: () => RootState) => {
  const {
    cells: { data, order },
  } = getState();

  const cells = order.map((id) => data[id]);
  return dispatch(
    apiCallBegan({
      url,
      data: { cells },
      method: 'post',
      onError: cellsSaveError.type,
    }),
  );
};

export const fetchCells = () =>
  apiCallBegan({
    url,
    method: 'get',
    onStart: cellsRequested.type,
    onError: cellsRequestFailed.type,
    onSuccess: cellsReceived.type,
  });

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export default slice.reducer;
