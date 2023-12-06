import React from 'react';
import BottomSheet from '../common/BottomSheet';
import { useAppDispatch, useAppSelector } from '@/src/redux/store';
import { closeCart } from '@/src/redux/slice/StoreSlice';
import { useCart } from 'react-use-cart';
import { CartEmptyState } from './EmptyState';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export const Cart = () => {
  const dispatch = useAppDispatch();

  const { isEmpty, emptyCart } = useCart();

  const { openCart } = useAppSelector((state) => state.storeSlice);

  const closeCartAction = () => {
    dispatch(closeCart());
  };

  return (
    <BottomSheet open={openCart} onClose={closeCartAction}>
      <BottomSheet.Content>
        <div className='flex justify-between items-center px-2'>
          <button className='rounded-full p-2 text-white shadow-sm hover:bg-gray-50/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 '>
            <ChevronLeftIcon className='h-6 w-6' />
          </button>
          <div className='mr-10'>Cart</div>
          <div></div>
        </div>
        {isEmpty ? (
          <CartEmptyState />
        ) : (
          <div className='p-4 '>
            <div className='bg-gray-50/10 p-2.5 rounded-2xl'>
              <div className='flex relative    space-x-3 '>
                <div className='flex items-center justify-center rounded-md '>
                  <div className='relative flex items-center justify-center '>
                    <img className='h-24 w-32' src='/t-shirt.png' alt='' />
                    {/* <img className='absolute h-4 w-4' src={imageUrl} alt='' /> */}
                  </div>
                </div>
                <div className='flex-1'>
                  <div className='flex font-medium justify-between'>
                    <div>T-Shirt</div>
                    <div>$ 19.99</div>
                  </div>
                  <div className='text-sm mt-2 mb-1 flex space-x-1'>
                    <div>Style</div>
                    <div className='text-gray-400'>Men's Cut</div>
                  </div>
                  <div className='text-sm flex mb-1 space-x-1'>
                    <div>Color</div>
                    <div className='text-gray-400'>White</div>
                  </div>
                  <div className='text-sm flex mb-1 space-x-1'>
                    <div>Size</div>
                    <div className='text-gray-400'>XL</div>
                  </div>
                </div>
              </div>
              <div className='flex justify-center text-sm items-baseline pt-4 divide-x divide-gray-400 text-gray-400'>
                <div className='px-3'>Edit</div>
                <div className='px-3'>Save For Later</div>
                <div className='px-3'>Remove</div>
              </div>
            </div>
            {/* <button onClick={emptyCart}>Clear Cart</button> */}
          </div>
        )}
      </BottomSheet.Content>
    </BottomSheet>
  );
};
