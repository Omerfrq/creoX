import { createSlice } from '@reduxjs/toolkit';

interface StoreSlice {
  user?: {
    id: string;
    name: string;
    phoneNumber: string;
  };
  cardId?: string;
  primaryLanguage: string;
  deliveryAddress?: string;
  orderType?: string;
  openCart: boolean;
}

const initialState: StoreSlice = {
  user: undefined,
  cardId: undefined,
  primaryLanguage: 'en',
  deliveryAddress: undefined,
  orderType: 'PICKUP',
  openCart: false,
};

const storeSlice = createSlice({
  name: 'storeSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCurrentSelectedCardId: (state, action) => {
      state.cardId = action.payload;
    },
    setDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
    },
    setPrimaryLanguage: (state, action) => {
      state.primaryLanguage = action.payload;
    },
    setOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    openCart: (state) => {
      state.openCart = true;
    },
    closeCart: (state) => {
      state.openCart = false;
    },
  },
});

export type StoreActions = typeof storeSlice.actions;

export const {
  setUser,
  openCart,
  closeCart,
  setCurrentSelectedCardId,
  setDeliveryAddress,
  setOrderType,
  setPrimaryLanguage,
} = storeSlice.actions;

export default storeSlice.reducer;
