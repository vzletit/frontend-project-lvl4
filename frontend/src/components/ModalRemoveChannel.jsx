// @ts-nocheck
import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { APIContext } from '../context/context';
import { setHideModal } from '../store/generalSlice';

export default function ModalRemoveChannel({ visible }) {
  const socketAPI = useContext(APIContext);

  const dispatch = useDispatch();
  const { name, id } = useSelector((state) => state.general.showModal.extra);

  const handleClose = () => {
    dispatch(setHideModal());
  };

  const handleRemoveChannel = () => {
    socketAPI.removeChannel(id);
    dispatch(setHideModal());
  };

  return (

    <Dialog open={visible} onClose={handleClose}>

      <DialogTitle>Delete channel</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure to delete channel
          {' '}
          <b>{name}</b>
          ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleRemoveChannel}>Delete</Button>
      </DialogActions>
    </Dialog>

  );
}
