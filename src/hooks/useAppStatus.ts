import { useDispatch } from 'react-redux';
import {
  setUser,
  setDeliveryAddress,
  setOrderType,
  setCurrentSelectedCardId,
} from '../redux/slice/StoreSlice';
import { useEffect } from 'react';

export const useAppStatus = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    const deliveryAddress = localStorage.getItem('deliveryAddress');
    const orderType = localStorage.getItem('orderType');
    const currentSelectedCard = localStorage.getItem('current-selected-card');

    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      dispatch(setUser(parsedUser));
    }

    if (currentSelectedCard) {
      dispatch(setCurrentSelectedCardId(currentSelectedCard));
    }

    if (deliveryAddress) {
      dispatch(setDeliveryAddress(deliveryAddress));
    }

    if (orderType) {
      dispatch(setOrderType(orderType));
    }
  }, [dispatch]);
};
