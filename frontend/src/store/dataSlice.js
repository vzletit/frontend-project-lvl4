/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import DataService from '../services/DataService';

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: null,
  fetchingData: false,
};

export const fetchData = createAsyncThunk(
  'data/initialFetchData',
  async () => {
    const response = await DataService.getData();
    return response;
  },
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
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

  extraReducers: {
    [fetchData.pending]: (state) => {
      state.fetchingData = true;
    },

    [fetchData.fulfilled]: (state, action) => {
      state.channels = action.payload.channels;
      state.messages = action.payload.messages;
      state.currentChannelId = action.payload.currentChannelId;
      state.fetchingData = false;
    },

    [fetchData.rejected]: (state) => {
      state.error = 'failed to get data from server';
      state.status = 'Error';
      state.fetchingData = false;
    },
  },
});

export const {
  setActiveChannel, addMessage, addChannel, removeChannel, renameChannel,
} = dataSlice.actions;
export default dataSlice.reducer;
