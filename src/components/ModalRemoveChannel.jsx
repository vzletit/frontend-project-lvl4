// @ts-nocheck
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { APIContext } from '../context/context';
import { setHideModal, setStatusBUSY } from '../store/generalSlice';

export default function ModalRemoveChannel({ visible }) {
  const { t } = useTranslation();
  const socketAPI = useContext(APIContext);

  const dispatch = useDispatch();
  const { name, id } = useSelector((state) => state.general.showModal.extra);

  const handleClose = () => {
    dispatch(setHideModal());
  };

  const handleRemoveChannel = () => {
    dispatch(setStatusBUSY());
    socketAPI.removeChannel(id, { err: t('ErrorNetwork'), success: t('removeChannelSuccess') });
    dispatch(setHideModal());
  };

  return (

    <Dialog open={visible} onClose={handleClose}>

      <DialogTitle>{t('removeChannelTitle')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('removeChannelDescr')}
          <b>{name}</b>
          ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('cancel')}</Button>
        <Button onClick={handleRemoveChannel}>{t('removeChannelSubmit')}</Button>
      </DialogActions>
    </Dialog>

  );
}
