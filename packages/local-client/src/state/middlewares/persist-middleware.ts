import { Dispatch } from 'redux';
import { RootActions, RootState } from '../index';
import { cellDeleted, cellInsertedAfter, cellMoved, cellUpdated, saveCells } from '../cells';

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<RootActions>;
  getState: () => RootState;
}) => {
  let timer: any;

  return (next: (action: RootActions) => void) => (action: RootActions) => {
    next(action);

    if (
      [cellMoved.type, cellUpdated.type, cellInsertedAfter.type, cellDeleted.type].includes(
        action.type,
      )
    ) {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        saveCells()(dispatch, getState);
      }, 250);
    }
  };
};
