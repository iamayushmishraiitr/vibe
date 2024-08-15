import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface MessageState{
 messages: string[];
}

const initialState: MessageState = {
  messages: []
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<string[]>) => {
      console.log("IN RDUX setMessage " ,action.payload )
      state.messages= action.payload
    },
    addMessages: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload)
      console.log("IN RDUX " ,)
    },
  },
});

export const { setMessages ,addMessages } =  messageSlice.actions;
export const getMessages = (state: { messages: MessageState }) => state.messages.messages;
export default messageSlice.reducer;
