/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import ModalRemoveChannel from './ModalRemoveChannel';
import ModalRenameChannel from './ModalRenameChannel';
import { setShowModal } from '../store/generalSlice';

export default function ChannelOptions(props) {
  const { t } = useTranslation();

  const showModal = useSelector((state) => state.general.showModal);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRename = ({ name, id }) => () => { dispatch(setShowModal({ type: 'renameChannel', extra: { id, name } })); };
  const handleRemove = ({ name, id }) => () => { dispatch(setShowModal({ type: 'removeChannel', extra: { id, name } })); };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      {open ? (
        <ClickAwayListener onClickAway={handleClose}>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem key="rename" onClick={handleRename(props)}>
              {t('renameChannelMenu')}
            </MenuItem>
            <MenuItem key="delete" onClick={handleRemove(props)}>
              {t('removeChannelMenu')}
            </MenuItem>
          </Menu>
        </ClickAwayListener>
      ) : null}
      <ModalRemoveChannel visible={showModal.type === 'removeChannel'} />
      <ModalRenameChannel visible={showModal.type === 'renameChannel'} />

    </>

  );
}
