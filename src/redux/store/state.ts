import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slices/authState';
import toastReducer from '../slices/toastState';
import userSetupReducer from '../slices/userSetupSlice';
import bookingReducer from '../slices/bookingSlice';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ApiCallMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  return next(action);
};

const reducer = {
  authState: authReducer,
  toastState: toastReducer,
  userSetup: userSetupReducer,
  bookingState: bookingReducer,
};

export const store = configureStore({
  reducer: reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(ApiCallMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
