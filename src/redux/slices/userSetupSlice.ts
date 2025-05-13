import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/state';

interface UserSetupState {
  uuid: string;
}

const initialState: UserSetupState = {
  uuid: '',
};

const userSetupSlice = createSlice({
  name: 'userSetup',
  initialState,
  reducers: {
    setUuid: (state, action: PayloadAction<string>) => {
      state.uuid = action.payload;
    },
  },
});

export const {setUuid} = userSetupSlice.actions;

export const selectUserUuid = (state: RootState) => state.userSetup.uuid;

export default userSetupSlice.reducer;
