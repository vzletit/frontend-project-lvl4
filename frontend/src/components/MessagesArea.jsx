import React, { useRef, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { useSelector } from 'react-redux';

export default function Messages() {
  const messages = useSelector((state) => state.data.messages);
  const currentChannelId = useSelector((state) => state.data.currentChannelId);

  const messagesEndRef = useRef();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <List dense component="span">
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
                    <Typography component="span" style={{ color: '#f00', fontSize: 14 }}>
                      {message.username}
                      {' '}
                    </Typography>
                    <Typography component="span" style={{ color: '#000', fontSize: 14 }}>{message.body}</Typography>
                  </>
)}
              />
            </ListItem>
          ))}
      </List>
      <div ref={messagesEndRef} />
    </>

  );
}
