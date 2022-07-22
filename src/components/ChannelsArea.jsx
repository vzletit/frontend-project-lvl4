import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ChannelOptions from './ChannelOptions';
import { setActiveChannel } from '../store/dataSlice';
import { setShowModal } from '../store/generalSlice';
import ModalAddChannel from './ModalAddChannel';
import ModalRemoveChannel from './ModalRemoveChannel';
import ModalRenameChannel from './ModalRenameChannel';

export default function ChannelsArea() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.general.showModal);
  const channels = useSelector((state) => state.data.channels);
  const currentChannelId = useSelector((state) => state.data.currentChannelId);
  const isInputBlocked = useSelector((state) => state.general.blockedInput);

  const handleChannelClick = (id) => { dispatch(setActiveChannel(id)); };

  return (
    <Box sx={{
      display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between',

    }}
    >

      <List aria-label="channels" sx={{ overflow: 'auto', height: 'calc(100vh - 139px)' }}>
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
              <Typography variant="inherit" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                #
                {' '}
                {channel.name}
              </Typography>
            </ListItemButton>
            <Box sx={{ display: 'flex' }}>
              { channel.removable
                ? <ChannelOptions id={channel.id} name={channel.name} /> : null }
            </Box>
          </Box>
        ))}
      </List>

      <Box sx={{ display: 'flex', flexBasis: '1', backgroundColor: '#ccc' }}>

        <Box sx={{ width: 1, textAlign: 'center', padding: '13px 0' }}>
          <IconButton
            color="primary"
            disabled={isInputBlocked}
            disableFocusRipple
            aria-label="Add channel"
            onClick={() => {
              dispatch(setShowModal({ type: 'addChannel', extra: { name: null, id: null } }));
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
        {showModal && showModal.type === 'addChannel' ? <ModalAddChannel visible /> : null }
        {showModal && showModal.type === 'removeChannel' ? <ModalRemoveChannel visible /> : null }
        {showModal && showModal.type === 'renameChannel' ? <ModalRenameChannel visible /> : null }

      </Box>
    </Box>

  );
}
