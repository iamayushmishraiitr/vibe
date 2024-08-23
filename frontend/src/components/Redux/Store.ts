// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from  "./slice/messageUsers"
import { UserState } from './slice/messageUsers'
import { MessageState } from './slice/messages';
import  socketReducer from "./slice/socketSlice" 
import messages from './slice/messages';
import curUsers from './slice/curUsers';
export interface RootState {
  users: UserState ;
  messages:MessageState
}
const store = configureStore({
  reducer: {
    users: userReducer,
    socket:socketReducer ,
    messages:messages ,
    curUser:curUsers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export default store;
