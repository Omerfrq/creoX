import { useAppDispatch, useAppSelector } from '@/src/redux/store';
import { useDialog } from '../../hooks/useDialog';
import { useEffect } from 'react';
import { useFetchPaymentCards } from '@/src/hooks/useFetchPaymentCards';
import { TapElementsForm } from './TapElements';
import { setCurrentSelectedCardId } from '@/src/redux/slice/StoreSlice';

import BottomSheet from '../common/BottomSheet';
import { SavedCard } from './SavedCard';

export const SavedCards = () => {
  const dispatch = useAppDispatch();

  const { openDialog, handleClose, handleOpen } = useDialog();

  const { user, cardId } = useAppSelector((state) => state.storeSlice);

  const { cards, isLoading } = useFetchPaymentCards({
    customerId: user?.id as string,
  });

  useEffect(() => {
    if (!cardId && cards?.length && !isLoading) {
      dispatch(setCurrentSelectedCardId(cards[0].thirdPartyTokenOrCardId));
      localStorage.setItem(
        'current-selected-card',
        cards[0].thirdPartyTokenOrCardId
      );
    }
  }, [cardId, cards, dispatch, isLoading]);

  if (isLoading) {
    return <div className='ltr:pl-10'>loaddingg</div>;
  }

  return (
    <div className='flex flex-col pt-2'>
      <BottomSheet open={openDialog} onClose={handleClose}>
        <BottomSheet.Content height='h-auto'>
          <TapElementsForm />
        </BottomSheet.Content>
      </BottomSheet>

      {cards?.length ? (
        <div className='space-y-5'>
          {cards?.map((card) => (
            <SavedCard key={card.thirdPartyTokenOrCardId} card={card} />
          ))}
        </div>
      ) : (
        <div className='text-sm text-gray-500'>
          Get started by adding a new card.
        </div>
      )}

      <div>
        <button
          onClick={handleOpen}
          type='button'
          className='text-sm mt-3 text-purple-500 font-medium'
        >
          + Add Card
        </button>
      </div>
    </div>
  );
};
