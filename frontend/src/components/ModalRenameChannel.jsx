// @ts-nocheck
import React, { useEffect, useRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { APIContext } from '../context/context';
import { setHideModal, setStatusBUSY } from '../store/generalSlice';

export default function ModalRenameChannel({ visible }) {
  const { t } = useTranslation();
  const socketAPI = useContext(APIContext);

  const channels = useSelector((state) => state.data.channels);
  const { name, id } = useSelector((state) => state.general.showModal.extra);

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

  const handleRenameChannel = ({ channelName }, { resetForm }) => {
    resetForm();
    dispatch(setStatusBUSY());
    socketAPI.renameChannel({ name: leoProfanity.clean(channelName), id }, { err: t('ErrorNetwork'), success: t('renameChannelSuccess') });
    dispatch(setHideModal());
  };

  return (

    <Formik
      initialValues={{ channelName: '' }}
      validationSchema={validate}
      onSubmit={handleRenameChannel}
    >

      {(formik) => (
        <Dialog open={visible} onClose={handleClose}>
          <Form onSubmit={formik.handleSubmit}>

            <DialogTitle>{t('renameChannelTitle')}</DialogTitle>
            <DialogContent>

              <TextField
                error={!!formik.errors.channelName}
                helperText={formik.errors.channelName}
                autoComplete="off"
                margin="dense"
                id="channelName"
                inputRef={inputRef}
                onChange={formik.handleChange}
                type="text"
                fullWidth
                value={formik.values.channelName}
                variant="standard"
                placeholder={name}
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>{t('cancel')}</Button>
              <Button type="submit">{t('renameChannelSubmit')}</Button>
            </DialogActions>
          </Form>

        </Dialog>
      )}

    </Formik>

  );
}
