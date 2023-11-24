import { configureStore } from '@reduxjs/toolkit';
import storeSlice from './slice/StoreSlice';
import alertSlice from './slice/AlertSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: {
    storeSlice,
    alertSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
