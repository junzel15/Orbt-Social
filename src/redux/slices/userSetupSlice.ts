import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/state';

interface UserSetupState {
  uuid: string;
  email: string;
  name: string;
}

const initialState: UserSetupState = {
  uuid: '',
  email: '',
  name: '',
};

const userSetupSlice = createSlice({
  name: 'userSetup',
  initialState,
  reducers: {
    setUuid: (state, action: PayloadAction<string>) => {
      state.uuid = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const {setUuid, setEmail, setName} = userSetupSlice.actions;

export const selectUserUuid = (state: RootState) => state.userSetup.uuid;
export const selectUserEmail = (state: RootState) => state.userSetup.email;
export const selectUserName = (state: RootState) => state.userSetup.name;

export default userSetupSlice.reducer;
