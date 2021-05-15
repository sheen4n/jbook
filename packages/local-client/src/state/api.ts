import { createAction } from '@reduxjs/toolkit';

interface ApiCallPayload {
  url: string;
  data?: any;
  method?: 'post' | 'get' | 'patch' | 'delete';
  onError?: string;
  onSuccess?: string;
  onStart?: string;
}

const apiCallBegan = createAction<ApiCallPayload>('api/callBegan');
const apiCallSuccess = createAction<any>('api/callSuccess');
const apiCallFailed = createAction<any>('api/callFailed');

export { apiCallBegan, apiCallSuccess, apiCallFailed };
