import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DirectionsIcon from '@mui/icons-material/Directions';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import socket from '../http/socket';
import { addMessage, setAppStatus, setBlockedInput } from '../store/dataSlice';

export default function InputArea() {
  const [newMessageText, setNewMessageText] = useState('');

  const isInputBlocked = useSelector((state) => state.data.blockedInput);
  const appStatus = useSelector((state) => state.data.status);
  const userName = useSelector((state) => state.data.userName);

  const dispatch = useDispatch();

  const currentChannelId = useSelector((state) => state.data.currentChannelId);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
      dispatch(setAppStatus('Ready'));
      dispatch(setBlockedInput(false));
    });
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessageText === '') { return; }

    dispatch(setBlockedInput(true));
    dispatch(setAppStatus('Sending'));

    socket.emit(
      'newMessage',
      {
        channelId: currentChannelId,
        body: newMessageText,
        username: userName,
      },
      (acknowledge) => (acknowledge ? dispatch(setBlockedInput(false)) : null),
    );
    setNewMessageText('');
  };

  return (

    <>
      <InputBase
        onChange={(event) => { setNewMessageText(event.target.value); }}
        sx={{ ml: 1, flex: 1 }}
        autoFocus
        disabled={isInputBlocked}
        required
        onKeyPress={(e) => {
          if (e.key === 'Enter') { handleSendMessage(e); }
        }}
        value={newMessageText}
        placeholder={appStatus === 'Sending' ? 'Sending...' : `${userName}:`}
        inputProps={{ 'aria-label': 'Enter message here' }}
      />

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        disabled={isInputBlocked}
        sx={{ p: '10px' }}
        aria-label="directions"
        type="submit"
        onClick={handleSendMessage}
      >

        <DirectionsIcon />
      </IconButton>
    </>
  );
}
