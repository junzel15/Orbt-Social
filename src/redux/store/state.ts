import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slices/authState';
import toastReducer from '../slices/toastState';

const ApiCallMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  return next(action);
};

const reducer = {
  authState: authReducer,
  toastState: toastReducer,
};

export const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(ApiCallMiddleware),
});

export default store;
