import axios from 'axios';
import { Dispatch } from 'react';
import { apiCallBegan, apiCallFailed, apiCallSuccess } from '../api';
import { RootActions, RootState } from '../index';

const api = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<RootActions>;
  getState: () => RootState;
}) => (next: (action: RootActions) => void) => async (action: RootActions) => {
  if (action.type !== apiCallBegan.type) return next(action);
  const { url, method, data, onSuccess, onStart, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action); // Still goes to next even if is apiCall or Not

  try {
    const response = await axios.request({
      baseURL: '/', // should put this in a configuratio file
      url,
      method,
      data,
    });

    // General Success Scenario, do not need to specify when calling the api
    dispatch(apiCallSuccess(response.data)); // Not attached to any reducers

    // Specific Success Handling
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error: any) {
    // General Error Handling
    dispatch(apiCallFailed(error.message)); // Not attached to any reducers

    // Specific Error Handling
    if (onError) dispatch({ type: onError, payload: error });
  }
};

export default api;
