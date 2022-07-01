import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataSlice.js';

const store = configureStore({
    reducer: {
      data: dataSlice
    },
  
  });
  
  export default store;