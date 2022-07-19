/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'Initial Fetching',
  error: '',
  blockedInput: true,
  messageText: '',
  userName: null,
  showModal: { type: null, extra: { name: null, id: null } },
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {

    setStatusOK: (state) => {
      state.status = 'OK';
      state.messageText = '';
      state.error = '';
      state.blockedInput = false;
    },

    setStatusBUSY: (state) => {
      state.status = 'Busy';
      state.messageText = '';
      state.error = '';
      state.blockedInput = true;
    },

    setStatusERROR: (state, action) => {
      state.status = 'Error';
      state.messageText = '';
      state.error = action.payload;
      state.blockedInput = false;
    },

    setMessageText: (state, action) => { state.messageText = action.payload; },
    setBlockedInput: (state, action) => { state.blockedInput = action.payload; },

    setUserName: (state, action) => { state.userName = action.payload; },

    setShowModal: (state, action) => { state.showModal = action.payload; },
    setHideModal: (state) => { state.showModal = { type: null, extra: { name: null, id: null } }; },

    setError: (state, action) => { state.error = action.payload; },
    clearError: (state) => { state.error = ''; },

  },
});

export const {
  setStatusOK, setStatusERROR, setStatusBUSY, setMessageText,

  setBlockedInput,
  setUserName,
  setShowModal,
  setHideModal,
  setError,
  clearError,

} = generalSlice.actions;
export default generalSlice.reducer;
