import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataSlice';
import generalSlice from './generalSlice';

const store = configureStore({
  reducer: {
    data: dataSlice,
    general: generalSlice,
  },

});

export default store;
