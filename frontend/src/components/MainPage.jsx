import React, { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { fetchData } from '../store/dataSlice';
import MessagesArea from './MessagesArea';
import ChannelsArea from './ChannelsArea';
import InputArea from './InputArea';
import Item from '../style/Item';

export default function MainPage() {
  const dispatch = useDispatch();
  const appStatus = useSelector((state) => state.data.status);

  useEffect(() => {
    try {
      dispatch(fetchData());
    } catch (err) { console.log(err); }
    console.log(appStatus);
  }, []);

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
                  {appStatus === 'loading' ? <CircularProgress /> : <ChannelsArea />}
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

                  {appStatus === 'loading' ? <CircularProgress /> : <MessagesArea />}

                </Item>
              </Grid>

              <Grid item xs={12}>
                <Item sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>

                  <InputArea />

                </Item>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

    </>
  );
}
