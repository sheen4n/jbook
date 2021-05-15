import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import bundle from '../bundler';
import { RootActions } from './index';

interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

// ------
// Reducers
// uses immer under the hood for mutable code
const slice = createSlice({
  name: 'bundles',
  initialState,
  reducers: {
    bundleStart: (state, action: PayloadAction<{ cellId: string }>) => {
      state[action.payload.cellId] = {
        loading: true,
        code: '',
        err: '',
      };
    },
    bundleComplete: (
      state,
      action: PayloadAction<{ cellId: string; bundle: { code: string; err: any } }>,
    ) => {
      state[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err,
      };
    },
  },
});

export const { bundleStart, bundleComplete } = slice.actions;

export const createBundle = (cellId: string, input: string) => async (
  dispatch: Dispatch<RootActions>,
) => {
  dispatch({
    type: bundleStart.type,
    payload: {
      cellId,
    },
  });

  const result = await bundle(input);

  return dispatch({
    type: bundleComplete.type,
    payload: {
      cellId,
      bundle: result,
    },
  });
};

export default slice.reducer;
