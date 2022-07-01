import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import DataService from '../services/DataService';

const initialState = {
    channels: [],
    messages: [],
    currentChannelId: null,
    status: null,
    error: null,    
};

export const initialFetchData = createAsyncThunk(
    'data/initialFetchData',
    async () => {
        const response = await DataService.getData(); 
        return response;
    }
);

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setActiveChannel: (state, action) => {state.currentChannelId = action.payload}
    },
    
    extraReducers: {
        [initialFetchData.pending]: (state) => {
            state.status = 'loading';
            state.error = null
        },

        [initialFetchData.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.error = null;
            state.channels = action.payload.channels;
            state.messages = action.payload.messages;
        },
        
        [initialFetchData.rejected]: (state) => {
            state.error = 'failed to get data from server'
        },
    }
});

export const { setActiveChannel } = dataSlice.actions;
export default dataSlice.reducer;