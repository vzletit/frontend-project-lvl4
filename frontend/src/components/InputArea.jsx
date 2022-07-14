import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DirectionsIcon from '@mui/icons-material/Directions';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import socketAPI from '../http/socket';
import {
  setStatusCONNECTING,
} from '../store/generalSlice';

export default function InputArea() {
  const isInputBlocked = useSelector((state) => state.general.blockedInput);
  const appStatus = useSelector((state) => state.general.status);
  const userName = useSelector((state) => state.general.userName);
  const currentChannelId = useSelector((state) => state.data.currentChannelId);
  const messages = useSelector((state) => state.data.messages);
  const channels = useSelector((state) => state.data.channels);
  const inputRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current.focus();
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [messages, channels]);

  const dispatch = useDispatch();

  const validate = Yup.object().shape({
    message: Yup.string().required(),
  });

  const handleSendMessage = ({ message }, { resetForm }) => {
    dispatch(setStatusCONNECTING());

    const newMessage = {
      channelId: currentChannelId,
      body: message,
      username: userName,
    };

    socketAPI.addMessage(newMessage);
    resetForm();
  };

  return (

    <Formik
      initialValues={{ message: '' }}
      validationSchema={validate}
      onSubmit={handleSendMessage}
    >

      {(formik) => (

        <Form style={{ display: 'flex', flex: 1, width: '100%' }}>

          <InputBase
            onChange={formik.handleChange}
            sx={{ ml: 1, flex: 1 }}
            autoComplete="off"
            inputRef={inputRef}
            autoFocus
            id="message"
            disabled={isInputBlocked}
            value={formik.values.message}
            placeholder={appStatus === 'Transfering data' ? 'Sending...' : `${userName}:`}
            inputProps={{ 'aria-label': 'Enter message here' }}
          />

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            disabled={isInputBlocked}
            sx={{ p: '10px' }}
            aria-label="Send message"
            type="submit"
          >
            <DirectionsIcon />
          </IconButton>
        </Form>

      )}

    </Formik>

  );
}
