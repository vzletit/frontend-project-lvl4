import React, { useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { initialSetData } from '../store/dataSlice';
import MessagesArea from '../components/MessagesArea';
import ChannelsArea from '../components/ChannelsArea';
import InputArea from '../components/InputArea';
import DataService from '../services/DataService';
import { setStatusOK } from '../store/generalSlice';
import { AuthContext } from '../context/context';

export default function MainPage() {
  const { setIsAuthenticated } = useContext(AuthContext);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const spinner = useSelector((state) => state.general.spinner);

  useEffect(() => {
    DataService.getData().then((data) => {
      if (data?.response?.status === 401) { setIsAuthenticated(false); return; }
      if (data?.response?.status) { toast.error(t('ErrorNetwork')); return; }

      dispatch(initialSetData(data));
    }).then(() => dispatch(setStatusOK()));
  }, []);

  return spinner ? (
    <Box sx={{
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
    }}
    >
      <CircularProgress />
    </Box>
  )

    : (
      <>
        <Box
          component="aside"
          sx={{
            display: 'flex',
            backgroundColor: '#dedede',
            flexGrow: 0,
            width: '250px',
            flexBasis: '250px',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >

          <ChannelsArea />

        </Box>
        <Box
          component="main"
          sx={{
            display: 'flex',
            backgroundColor: '#eaeff1',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{
            display: 'flex', flex: 1, padding: '10px 0 0 20px', flexDirection: 'column',
          }}
          >
            <MessagesArea />
          </Box>
          <hr />
          <Box sx={{ display: 'flex', flexBasis: '1', mb: 1 }}><InputArea /></Box>
        </Box>
      </>

    );
}
