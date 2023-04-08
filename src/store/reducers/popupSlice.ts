import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from '../store';

interface initialStateTypes {
  isPopupOpen: boolean;
  isEmailPage: boolean;
  isCodePage: boolean;
}

const initialState = {
  isPopupOpen: false,
  isEmailPage: true,
  isCodePage: false
};

export const popupSlice = createSlice({
  name: 'popupSlice',
  initialState: initialState as initialStateTypes,
  reducers: {
    setPopup: (state, { payload }) => {
      state.isPopupOpen = payload;
    }
  }
});

export const selectorPopup = (state: IRootState) => state.popupSlice;

export const { setPopup } = popupSlice.actions;

export default popupSlice.reducer;
