import React, { useRef, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

export default function Messages() {
  const messages = useSelector((state) => state.data.messages);
  const channels = useSelector((state) => state.data.channels);
  const currentChannelId = useSelector((state) => state.data.currentChannelId);

  const currentChannelName = channels.filter((channel) => channel.id === currentChannelId)[0].name;

  const messagesEndRef = useRef();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <>
      <Typography variant="h6">
        {`# ${currentChannelName} (${messages.filter((message) => message.channelId === currentChannelId).length})`}
      </Typography>
      <hr style={{ m: 0 }} />
      <List dense component="span" sx={{ overflow: 'auto', height: 'calc(100vh - 229px)' }}>
        {messages.filter((message) => message.channelId === currentChannelId)
          .map((message) => (
            <ListItem
              key={message.id}
              disablePadding
            >
              <ListItemText
                disableTypography
                primary={(
                  <>
                    <Typography component="span" style={{ color: '#ff3355', fontSize: 14 }}>
                      {message.username}
                      {' '}
                    </Typography>
                    <Typography component="span" style={{ color: '#000', fontSize: 14 }}>{message.body}</Typography>
                  </>
)}
              />
            </ListItem>
          ))}
        <div ref={messagesEndRef} />

      </List>
    </>

  );
}
