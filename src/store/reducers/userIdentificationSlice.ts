import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, IRootState } from '../store';
import { _url, _user, makeFetchRequest } from '../../utils/userRequest';

interface initialStateTypes {
  isUserIdentified: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorType: string;
}

const initialState = {
  isUserIdentified: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorType: ''
};

export const getUserIdentification = createAsyncThunk<
  void | string,
  string,
  {
    dispatch: AppDispatch;
    state: IRootState;
  }
>('getUserIdentification', async (userEmail, thunkAPI) => {
  try {
    const headers = { 'Content-Type': 'application/json' };
    const body = { email: userEmail };

    const response = await fetch(`${_url}${_user}`, {
      method: 'POST',
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
    if (!response.ok) {
      return thunkAPI.rejectWithValue('Неправильный адрес почты' as string);
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue('Ошибка сервера' as string);
  }
});

export const userIdentificationSlice = createSlice({
  name: 'userIdentificationSlice',
  initialState: initialState as initialStateTypes,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserIdentification.pending, (state) => {
      state.isUserIdentified = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(getUserIdentification.fulfilled, (state) => {
      state.isUserIdentified = true;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(getUserIdentification.rejected, (state, { payload }) => {
      if (payload) {
        state.errorType = payload as string;
      }
      state.isLoading = false;
      state.isError = true;
    });
  }
});

export const selectorUserIdentificationSlice = (state: IRootState) => state.userIdentificationSlice;

export default userIdentificationSlice.reducer;
