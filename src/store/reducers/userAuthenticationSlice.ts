import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, IRootState } from '../store';
import { _url, _user, makeFetchRequest } from '../../utils/userRequest';
import { localStorageGetItem, localStorageRemoveItem, storage } from '../../utils/storage';

interface initialStateTypes {
  isAuth: boolean | null;
  userName: string | null;
  userEmail: string | null;
  userToken: string | null;
  // userData: iUserData | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorType: string;
}

interface iUserData {
  _id: string;
  name: string;
  email: string;
  token: string;
  __v: number;
}

interface iUser {
  name: string;
  email: string;
  token: string;
}

const initialState = {
  isAuth: localStorageGetItem(storage.chatAppIsAuth) || false,
  userName: localStorageGetItem(storage.chatAppUserName) || null,
  userEmail: localStorageGetItem(storage.chatAppUserEmail) || null,
  userToken: localStorageGetItem(storage.chatAppUserToken) || null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorType: ''
};

export const getUserAuthentication = createAsyncThunk<
  iUser,
  string,
  {
    dispatch: AppDispatch;
    state: IRootState;
  }
>('getUserAuthentication', async (token, thunkAPI) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await fetch(`${_url}${_user}/me`, {
      method: 'GET',
      headers
    });
    if (response.ok) {
      const { name, email, token } = (await response.json()) as iUserData;
      return { name, email, token } as iUser;
    } else {
      return thunkAPI.rejectWithValue('Неправильный код' as string);
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue('Ошибка сервера' as string);
  }
});

export const changeUserName = createAsyncThunk<
  iUser,
  { userName: string; token: string },
  {
    dispatch: AppDispatch;
    state: IRootState;
  }
>('changeUserName', async ({ userName, token }, thunkAPI) => {
  try {
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
    const body = { name: userName };
    const response = await fetch(`${_url}${_user}`, {
      method: 'PATCH',
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
    if (response.ok) {
      const { name } = (await response.json()) as iUserData;
      return { name } as iUser;
    } else {
      return thunkAPI.rejectWithValue('Что-то пошло не так' as string);
    }
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue('Ошибка сервера' as string);
  }
});

export const userAuthenticationSlice = createSlice({
  name: 'userAuthenticationSlice',
  initialState: initialState as initialStateTypes,
  reducers: {
    setLogout: (state) => {
      state.isAuth = false;
      state.userName = null;
      state.userEmail = null;
      state.userToken = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAuthentication.pending, (state) => {
      state.isAuth = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(getUserAuthentication.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.userName = payload.name;
      state.userEmail = payload.email;
      state.userToken = payload.token;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(getUserAuthentication.rejected, (state, { payload }) => {
      if (payload) {
        state.errorType = payload as string;
      }
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(changeUserName.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    builder.addCase(changeUserName.fulfilled, (state, { payload }) => {
      state.userName = payload.name;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(changeUserName.rejected, (state, { payload }) => {
      if (payload) {
        state.errorType = payload as string;
      }
      state.isError = true;
      state.isLoading = false;
    });
  }
});

export const selectorUserAuthenticationSlice = (state: IRootState) => state.userAuthenticationSlice;

export const { setLogout } = userAuthenticationSlice.actions;

export default userAuthenticationSlice.reducer;
