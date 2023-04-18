import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from '../store';

interface initialStateTypes {
  theme: 'dark' | 'light';
  isThemeDark: boolean;
}

interface reducerThemeTypes {
  type: string;
  payload: boolean;
}

const initialState = {
  theme: 'dark',
  isThemeDark: true
};

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState: initialState as initialStateTypes,
  reducers: {
    setDarkTheme: (state) => {
      state.theme = 'dark';
      state.isThemeDark = true;
    },
    setLightTheme: (state) => {
      state.theme = 'light';
      state.isThemeDark = false;
    }
  }
});

export const selectorTheme = (state: IRootState) => state.themeSlice;

export const { setDarkTheme, setLightTheme } = themeSlice.actions;

export default themeSlice.reducer;
