import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initialFetchData, setActiveChannel } from '../store/dataSlice.js';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import DirectionsIcon from '@mui/icons-material/Directions';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

export default function MainPage() {
const dispatch = useDispatch();

const channels = useSelector(state => state.data.channels)
const messages = useSelector(state => state.data.messages)
const error = useSelector(state => state.data.error)
const status = useSelector(state => state.data.status)
const currentChannelId = useSelector(state => state.data.currentChannelId)

useEffect( ()=> {
  dispatch(initialFetchData());
},[]);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const handleChannelClick = (id) => {dispatch(setActiveChannel(id))}


return (
  <>
  <h2>Чядъ</h2>

  <Box sx={{ flexGrow: 1 }}>
    <Paper style={{ maxHeight: 500, overflow: 'auto' }} />
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Typography>Channels</Typography>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
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

            </Item>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={9}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item><Typography>Messages</Typography></Item>
          </Grid>

          <Grid item xs={12}>
            <Item style={{ height: 450, overflow: 'auto' }}>
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
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter message here"
                inputProps={{ 'aria-label': 'Enter message here' }}
              />

              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <DirectionsIcon />
              </IconButton>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>

</>
  )
}
