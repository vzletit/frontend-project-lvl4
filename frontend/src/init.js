/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import i18next from 'i18next';
import leoProfanity from 'leo-profanity';
import { I18nextProvider } from 'react-i18next';
import { APIContext } from './context/context';
import ru from './lang/ru';
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
  setStatusSUCCESS,

} from './store/generalSlice';
import App from './App';

export default async function init() {
  await i18next.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  });

  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

  const store = configureStore({
    reducer: {
      data: dataSlice,
      general: generalSlice,
    },
  });

  const socket = io();

  const toastApiAcknowledge = (toastMsgs) => (err, reply) => {
    if (err) {
      store.dispatch(setStatusERROR(toastMsgs.err));
      toast.error(toastMsgs.err);
    }
    if (reply) {
      store.dispatch(setStatusSUCCESS(toastMsgs.success));
      toast.success(toastMsgs.success);
    }
    store.dispatch(setStatusOK());
  };

  const socketAPI = {
    addMessage: (msg, toastMsgs) => socket.volatile.timeout(3000).emit('newMessage', msg, toastApiAcknowledge(toastMsgs)),
    newChannel: (name, toastMsgs) => socket.volatile.timeout(3000).emit('newChannel', name, toastApiAcknowledge(toastMsgs)),
    renameChannel: (args, toastMsgs) => socket.volatile.timeout(3000).emit('renameChannel', args, toastApiAcknowledge(toastMsgs)),
    removeChannel: (id, toastMsgs) => socket.volatile.timeout(3000).emit('removeChannel', { id }, toastApiAcknowledge(toastMsgs)),
  };

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
    store.dispatch(setStatusOK());
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
    store.dispatch(setActiveChannel(payload.id));
    store.dispatch(setStatusOK());
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
      <I18nextProvider i18n={i18next}>
        <APIContext.Provider value={socketAPI}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </APIContext.Provider>
      </I18nextProvider>
    </Provider>
  );
}
