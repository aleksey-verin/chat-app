import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userIdentificationSlice from './reducers/userIdentificationSlice';
import userAuthenticationSlice from './reducers/userAuthenticationSlice';
import popupSlice from './reducers/popupSlice';
import messagesSlice from './reducers/messagesSlice';
import themeSlice from './reducers/themeSlice';
import { useDispatch } from 'react-redux';
import { localStorageSetItem, storage } from '../utils/storage';

export const rootReducer = combineReducers({
  userIdentificationSlice,
  userAuthenticationSlice,
  popupSlice,
  messagesSlice,
  themeSlice
});

export const store = configureStore({
  reducer: rootReducer
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false
  //   })
});

store.subscribe(() => {
  localStorageSetItem(storage.chatAppIsAuth, store.getState().userAuthenticationSlice.isAuth);
  localStorageSetItem(storage.chatAppUserName, store.getState().userAuthenticationSlice.userName);
  localStorageSetItem(storage.chatAppUserEmail, store.getState().userAuthenticationSlice.userEmail);
  localStorageSetItem(storage.chatAppUserToken, store.getState().userAuthenticationSlice.userToken);

  // storageSetItem(storage.weatherFavoriteList, store.getState().favoriteCitiesSlice);
  // storageSetItem(storage.weatherCurrentCity, store.getState().currentWeatherSlice.currentCity);
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
