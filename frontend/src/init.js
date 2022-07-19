/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { APIContext } from './context/context';
import dataSlice, {
  addMessage,
  addChannel,
  setActiveChannel,
  removeChannel,
  renameChannel,
} from './store/dataSlice';
import generalSlice, {
  setStatusERROR,
  setStatusOK,
} from './store/generalSlice';
import App from './App';

export default async function init() {
  const store = configureStore({
    reducer: {
      data: dataSlice,
      general: generalSlice,
    },
  });

  const socket = io();

  const acknowledge = (err, reply) => {
    if (err) {
      console.log(err);
      store.dispatch(setStatusERROR('Network problem'));
    }
    if (reply) { store.dispatch(setStatusOK()); }
  };

  const socketAPI = {
    addMessage: (msg) => socket.volatile.timeout(3000).emit('newMessage', msg, acknowledge),
    newChannel: (name) => socket.volatile.timeout(3000).emit('newChannel', name, acknowledge),
    renameChannel: (args) => socket.volatile.timeout(3000).emit('renameChannel', args, acknowledge),
    removeChannel: (id) => socket.volatile.timeout(3000).emit('removeChannel', { id }, acknowledge),
  };

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
    store.dispatch(setStatusOK());
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
    store.dispatch(setActiveChannel(payload.id));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel(payload));
    store.dispatch(setActiveChannel(payload.id));
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));
    store.dispatch(setActiveChannel(1));
  });

  return (
    <Provider store={store}>
      <APIContext.Provider value={socketAPI}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </APIContext.Provider>
    </Provider>
  );
}
