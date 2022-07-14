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
import { setStatusOK } from '../store/generalSlice';

export default function MainPage() {
  const dispatch = useDispatch();

  const fetchingData = useSelector((state) => state.data.fetchingData);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(setStatusOK());
  }, []);

  const defaultBox = {
    m: 1,
    p: 1,
    bgcolor: '#555',
    color: 'grey.800',
    border: '1px solid',
    borderColor: 'grey.300',
    borderRadius: 2,
  };

  return (
    <>
      <h2>Чядъ</h2>
      <Box xs={{ ...defaultBox }}>
        <Paper style={{ maxHeight: 500, overflow: 'auto' }} />
        <Grid container spacing={1} columns={{ xs: 1, md: 12 }}>
          <Grid item xs={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Item>
                  <Typography>Channels</Typography>
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item>
                  {fetchingData ? <CircularProgress /> : <ChannelsArea />}
                </Item>
              </Grid>

            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Item><Typography>Messages</Typography></Item>
              </Grid>

              <Grid item xs={12}>
                <Item style={{ height: 450, overflow: 'auto' }}>

                  {fetchingData ? <CircularProgress /> : <MessagesArea />}

                </Item>
              </Grid>

              <Grid item xs={12}>
                <Item sx={{ p: '2px 4px', display: 'flex', alignItems: 'left' }}>
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
