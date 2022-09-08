import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//MODELS
import NoteService from './noteService'


const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Create note
export const createNote = createAsyncThunk('notes/create', async (noteData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await NoteService.createNote(noteData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Get Notes
export const getAllNotes = createAsyncThunk('notes/getAll', async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await NoteService.getAllNotes(ticketId, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const noteSLice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNote.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(getAllNotes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes = action.payload
            })
            .addCase(getAllNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
    }
})

export const {reset} = noteSLice.actions
export default noteSLice.reducer