import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const {setAccessToken} = authSlice.actions;

export const selectAccessToken = (state: any) => state.authState.accessToken;

const authReducer = authSlice.reducer;
export default authReducer;
