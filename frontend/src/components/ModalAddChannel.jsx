// @ts-nocheck
import React, { useContext, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
import { APIContext } from '../context/context';
import { setHideModal, setStatusBUSY } from '../store/generalSlice';

export default function ModalAddChannel({ visible }) {
  const { t } = useTranslation();
  const socketAPI = useContext(APIContext);

  const channels = useSelector((state) => state.data.channels);

  const dispatch = useDispatch();

  const inputRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef?.current?.focus();
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);

  const channelNamesLowerCaseArr = [];
  channels.forEach((channel) => channelNamesLowerCaseArr.push(channel.name.toLowerCase()));

  const validate = Yup.object().shape({
    channelName: Yup
      .string()
      .required(t('ErrorRequired'))
      .test(
        'existsCheck',
        t('ErrorChannelExists'),
        (value = '') => !channelNamesLowerCaseArr.includes(value.toLowerCase()),
      ),

  });

  const handleClose = () => {
    dispatch(setHideModal());
  };

  const handleAddChannel = ({ channelName }, { resetForm }) => {
    dispatch(setStatusBUSY());
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

            <DialogTitle>{t('addChannelTitle')}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t('addChannelDescr')}
              </DialogContentText>

              <TextField
                autoFocus
                inputRef={inputRef}
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
              <Button onClick={handleClose}>{t('cancel')}</Button>
              <Button type="submit">{t('addChannelSubmit')}</Button>
            </DialogActions>
          </Form>

        </Dialog>
      )}

    </Formik>

  );
}
