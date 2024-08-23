import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  img: string;
  name: string;
}

export interface UserState {
  curUser: User;
}

const initialState: UserState = {
  curUser: { img: '', name: '' }, // Initialize with default values
};

const curUserSlice = createSlice({
  name: 'curUser',
  initialState,
  reducers: {
    setCurUser: (state, action: PayloadAction<User>) => {
      state.curUser = action.payload; // Correct state update
    },
  },
});

export const { setCurUser } = curUserSlice.actions;
export const getCurUser = (state: { curUser: UserState }) => state.curUser.curUser;
export default curUserSlice.reducer;
