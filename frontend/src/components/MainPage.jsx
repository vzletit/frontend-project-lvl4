import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { initialSetData } from '../store/dataSlice';
import MessagesArea from './MessagesArea';
import ChannelsArea from './ChannelsArea';
import InputArea from './InputArea';
import DataService from '../services/DataService';
import { setStatusOK } from '../store/generalSlice';

export default function MainPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const spinner = useSelector((state) => state.general.spinner);

  useEffect(() => {
    DataService.getData().then((data) => {
      if (!data) {
        toast.error(t('ErrorNetwork'));
        return;
      }
      dispatch(initialSetData(data));
    }).then(() => dispatch(setStatusOK()));
  }, []);

  // if (fetchingError) { toast.error(t('ErrorNetwork')); }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return spinner ? (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
    >
      <CircularProgress />
    </Box>
  )

    : (
      <Box sx={{ padding: '30px' }}>
        <Paper style={{ maxHeight: 500, overflow: 'auto' }} />
        <Grid container spacing={1} columns={{ xs: 1, md: 12 }}>
          <Grid item xs={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Item>
                  <Typography>{t('channels')}</Typography>
                </Item>
              </Grid>
              <Grid item xs={12}>
                <Item>
                  <ChannelsArea />
                </Item>
              </Grid>

            </Grid>
          </Grid>

          <Grid item xs={10}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Item><Typography>{t('messages')}</Typography></Item>
              </Grid>

              <Grid item xs={12}>
                <Item style={{ height: 450, overflow: 'auto' }}>

                  <MessagesArea />

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
    );
}
