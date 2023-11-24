import { useAppDispatch, useAppSelector } from '@/src/redux/store';
import { TapPaymentCard } from '@/src/types/helpers';
import { classNames, getPaymentMethodImage } from '@/src/utils/helpers';
import React from 'react';
import Image from 'next/image';
import { setCurrentSelectedCardId } from '@/src/redux/slice/StoreSlice';
import { PaymentMethod } from '@/src/types/helpers';

export const SavedCard = ({ card }: { card: TapPaymentCard }) => {
  const { cardId } = useAppSelector((state) => state.storeSlice);

  const dispatch = useAppDispatch();

  const handleSelectCard = (cardId: string) => {
    dispatch(setCurrentSelectedCardId(cardId));
    localStorage.setItem('current-selected-card', cardId);
  };

  return (
    <div
      onClick={() => {
        handleSelectCard(card.thirdPartyTokenOrCardId);
      }}
      key={card.thirdPartyTokenOrCardId}
      className={classNames(
        'flex border py-1.5 px-3 border-solid rounded-md border-gray-300 items-center justify-between',
        cardId && cardId.toString() === card.thirdPartyTokenOrCardId
          ? 'border-purple-500 border-2'
          : ''
      )}
    >
      <div className='h-8 w-12 flex items-center justify-center relative'>
        <Image
          layout='fill'
          className='object-cover rounded-md'
          src={getPaymentMethodImage(card.method as PaymentMethod)}
          alt={card.method}
        />
      </div>
      <div className='flex items-center tracking-widest text-white text-sm space-x-4 font-medium'>
        <span>● ● ● ●</span>
        <span>● ● ● ●</span>
        <span className='text-xl'>{card.lastDigits}</span>
      </div>
    </div>
  );
};
