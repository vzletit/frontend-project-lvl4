/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import DataService from '../services/DataService';

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: null,
  status: null,
  error: null,
  blockedInput: null,
  userName: null,
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
    addMessage: (state, action) => { state.messages.push(action.payload); state.status = 'Ready'; },
    setAppStatus: (state, action) => { state.status = action.payload; },
    setBlockedInput: (state, action) => { state.blockedInput = action.payload; },
    setUserName: (state, action) => { state.userName = action.payload; },
  },

  extraReducers: {
    [fetchData.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },

    [fetchData.fulfilled]: (state, action) => {
      state.status = 'Ready';
      state.error = null;
      state.channels = action.payload.channels;
      state.messages = action.payload.messages;
      state.currentChannelId = action.payload.currentChannelId;
    },

    [fetchData.rejected]: (state) => {
      state.error = 'failed to get data from server';
    },
  },
});

export const {
  setActiveChannel, addMessage, setAppStatus, setBlockedInput, setUserName,
} = dataSlice.actions;
export default dataSlice.reducer;
