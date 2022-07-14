import io from 'socket.io-client';
import store from '../store';
import {
  addMessage,
  addChannel,
  setActiveChannel,
  removeChannel,
  renameChannel,
} from '../store/dataSlice';
import { setStatusERROR, setStatusOK } from '../store/generalSlice';

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

export default socketAPI;
