import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//MODELS
import TicketService from './ticketService'


const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Create ticket
export const createTicket = createAsyncThunk('tickets/create', async (ticketData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await TicketService.createTicket(ticketData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Get ticket
export const getAllTickets = createAsyncThunk('tickets/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await TicketService.getAllTickets(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Get one ticket
export const getOneTicket = createAsyncThunk('tickets/getOne', async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await TicketService.getOneTicket(ticketId, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(getAllTickets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets = action.payload
            })
            .addCase(getAllTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(getOneTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOneTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ticket = action.payload
            })
            .addCase(getOneTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
    }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer