import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {User} from "@/interface"
export interface UserState{
 users: User[] ;
}

const initialState: UserState = {
  users: [],
};

const messageUserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users= [...state.users,...action.payload]
    },
  },
});

export const { setUsers } =  messageUserSlice.actions;
export const getMessageUsers = (state: { users: UserState }) => state.users.users ;
export default messageUserSlice.reducer;
