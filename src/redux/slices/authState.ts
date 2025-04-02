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
const authReducer = authSlice.reducer;
export default authReducer;
