/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: 1,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {

    initialSetData: (state, action) => {
      state.channels = action.payload.channels;
      state.messages = action.payload.messages;
    },

    setActiveChannel: (state, action) => { state.currentChannelId = action.payload; },

    addChannel: (state, action) => { state.channels.push(action.payload); },

    renameChannel: (state, action) => {
      const selectedChannel = state.channels.find((channel) => channel.id === action.payload.id);
      selectedChannel.name = action.payload.name;
    },

    removeChannel: (state, action) => {
      const filteredChannels = state.channels
        .filter((channel) => channel.id !== action.payload);

      const filteredMessages = state.messages
        .filter((message) => message.channelId !== action.payload);

      state.channels = filteredChannels;
      state.messages = filteredMessages;
    },

    addMessage: (state, action) => { state.messages.push(action.payload); },
  },

});

export const {
  setActiveChannel, addMessage, addChannel, removeChannel, renameChannel, initialSetData,
} = dataSlice.actions;
export default dataSlice.reducer;
