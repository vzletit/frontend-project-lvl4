// @ts-nocheck
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useDispatch, useSelector } from 'react-redux';
import socketAPI from '../http/socket';
import { setHideModal } from '../store/generalSlice';

export default function ModalAddChannel({ visible }) {
  const channels = useSelector((state) => state.data.channels);

  const dispatch = useDispatch();

  const channelNamesLowerCaseArr = [];
  channels.forEach((channel) => channelNamesLowerCaseArr.push(channel.name.toLowerCase()));

  const validate = Yup.object().shape({
    channelName: Yup
      .string()
      .required()
      .test(
        'existsCheck',
        'Channel already exists',
        (value = '') => !channelNamesLowerCaseArr.includes(value.toLowerCase()),
      ),

  });

  const handleClose = () => {
    dispatch(setHideModal());
  };

  const handleAddChannel = ({ channelName }, { resetForm }) => {
    resetForm();
    socketAPI.newChannel({ name: channelName });
    dispatch(setHideModal());
  };

  return (

    <Formik
      initialValues={{ channelName: '' }}
      validationSchema={validate}
      onSubmit={handleAddChannel}
    >

      {(formik) => (
        <Dialog open={visible} onClose={handleClose}>
          <Form onSubmit={formik.handleSubmit}>

            <DialogTitle>Create channel</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter new channel name (should be unique).
              </DialogContentText>

              <TextField
                autoFocus
                error={!!formik.errors.channelName}
                helperText={formik.errors.channelName}
                autoComplete="off"
                margin="dense"
                id="channelName"
                onChange={formik.handleChange}
                type="text"
                fullWidth
                value={formik.values.channelName}
                variant="standard"
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Create</Button>
            </DialogActions>
          </Form>

        </Dialog>
      )}

    </Formik>

  );
}
