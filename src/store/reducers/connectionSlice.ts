import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from '../store';

interface initialStateTypes {
  isConnected: boolean;
}

const initialState = {
  isConnected: false
};

export const connectionSlice = createSlice({
  name: 'connectionSlice',
  initialState: initialState as initialStateTypes,
  reducers: {
    setConnectionLight: (state, { payload }) => {
      state.isConnected = payload;
    }
  }
});

export const selectorConnection = (state: IRootState) => state.connectionSlice;

export const { setConnectionLight } = connectionSlice.actions;

export default connectionSlice.reducer;
