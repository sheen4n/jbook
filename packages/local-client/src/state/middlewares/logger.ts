// SNA = Store, Next, Action

import { Dispatch } from 'react';
import { Action } from '../actions';
import { RootState } from '../reducers';

export const logger = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => (next: (action: Action) => void) => (action: Action) => {
  // console.log('logging to params:', params.destination);
  console.log('store', getState); // Just to see what is in pseudo store
  // console.log('next', next); // See what is next
  console.log('action', action); // See what is the action and payload
  return next(action); // calls next, if is last middleware ,next = reducer
};
