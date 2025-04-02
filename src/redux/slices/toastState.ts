import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  errorMessage: '',
  successMessage: '',
};

export const toastSlice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
  },
});

export const {setErrorMessage, setSuccessMessage} = toastSlice.actions;

const toastReducer = toastSlice.reducer;

export default toastReducer;
