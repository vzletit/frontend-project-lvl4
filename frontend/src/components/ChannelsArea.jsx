import React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveChannel } from '../store/dataSlice';

export default function ChannelsArea() {
  const dispatch = useDispatch();

  const channels = useSelector((state) => state.data.channels);
  const currentChannelId = useSelector((state) => state.data.currentChannelId);

  const handleChannelClick = (id) => { dispatch(setActiveChannel(id)); };

  return (

    <List component="nav" aria-label="main mailbox folders">

      {channels.map((channel) => (
        <ListItemButton
          key={channel.id}
          selected={currentChannelId === channel.id}
          onClick={() => handleChannelClick(channel.id)}
        >
          <ListItemText primary={channel.name} />
        </ListItemButton>
      ))}
    </List>

  );
}
