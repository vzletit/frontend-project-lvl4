import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ChannelOptions from './ChannelOptions';
import { setActiveChannel } from '../store/dataSlice';
import { setShowModal } from '../store/generalSlice';
import ModalAddChannel from './ModalAddChannel';

export default function ChannelsArea() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.general.showModal);
  const channels = useSelector((state) => state.data.channels);
  const currentChannelId = useSelector((state) => state.data.currentChannelId);
  const isInputBlocked = useSelector((state) => state.general.blockedInput);

  const handleChannelClick = (id) => { dispatch(setActiveChannel(id)); };

  return (

    <List component="nav" aria-label="main mailbox folders">

      { channels.map((channel) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
          key={channel.id}
        >
          <ListItemButton
            sx={{ display: 'flex', flexGrow: 1 }}
            selected={currentChannelId === channel.id}
            onClick={() => handleChannelClick(channel.id)}
          >
            <Typography variant="inherit" noWrap>
              #
              {' '}
              {channel.name}
            </Typography>
          </ListItemButton>
          <Box sx={{ display: 'flex' }}>
            { channel.removable ? <ChannelOptions id={channel.id} name={channel.name} /> : null }
          </Box>
        </Box>
      ))}
      <Divider sx={{ mb: '1em' }} />

      <IconButton
        color="primary"
        disabled={isInputBlocked}
        disableFocusRipple
        sx={{ p: '10px' }}
        aria-label="Add channel"
        onClick={() => {
          dispatch(setShowModal({ type: 'addChannel', extra: { name: null, id: null } }));
        }}
      >
        <AddIcon />
      </IconButton>
      <ModalAddChannel visible={showModal.type === 'addChannel'} />
    </List>

  );
}
