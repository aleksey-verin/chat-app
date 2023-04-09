import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, IRootState } from '../store';
import { _url, _user, _messages } from '../../utils/userRequest';

interface initialStateTypes {
  messages: iMessage[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorType: string;
}

const initialState = {
  messages: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorType: ''
};

export const getMessages = createAsyncThunk<
  iMessage[],
  string,
  {
    dispatch: AppDispatch;
    state: IRootState;
  }
>('getMessages', async (token, thunkAPI) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await fetch(`${_url}${_messages}`, {
      method: 'GET',
      headers
    });
    if (response.ok) {
      const data: iRootMessages = await response.json();
      return data.messages;
    } else {
      return thunkAPI.rejectWithValue('Какая-то ошибка' as string);
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue('Ошибка сервера' as string);
  }
});

export const messagesSlice = createSlice({
  name: 'messagesSlice',
  initialState: initialState as initialStateTypes,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(getMessages.fulfilled, (state, { payload }) => {
      state.messages = payload;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(getMessages.rejected, (state, { payload }) => {
      if (payload) {
        state.errorType = payload as string;
      }
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const selectorMessagesSlice = (state: IRootState) => state.messagesSlice;

export default messagesSlice.reducer;
