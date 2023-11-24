import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import BottomSheet from '../common/BottomSheet';
import { useAppSelector } from '@/src/redux/store';
import { useDialog } from '@/src/hooks/useDialog';
import { useGenerationHistory } from '@/src/hooks/useGenerationHistory';
import { HistoryItem } from './HistoryItem';
import { Loader } from '../common/Loader';

const HistoryDetails = () => {
  const { user } = useAppSelector((state) => state.storeSlice);
  const { history, isLoading } = useGenerationHistory({
    userId: user?.id,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='px-4'>
      <div className='pt-4'>
        <div className='flex items-center'>
          <div className='h-6 w-6 flex items-center justify-center bg-button mr-2 rounded-full'>
            <ClockIcon className='h-4 w-4 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-white'>History</h1>
        </div>
        <p className='text-sm mt-0.5  ml-9 font-medium text-gray-400'>
          A list of all the previous generations you made.
        </p>
      </div>
      {history?.length ? (
        <div className='pt-4 divide-y divide-pink-400'>
          {history?.map((generation) => (
            <HistoryItem key={generation.id} history={generation} />
          ))}
        </div>
      ) : (
        <div className='mt-20 flex flex-col items-center'>
          <div className='flex items-center justify-center w-full'>
            <div className='h-56 w-56 flex items-center justify-center mr-2 rounded-full'>
              <ClockIcon strokeWidth={1} className='h-56 w-56 text-white' />
            </div>
          </div>
          <div className='mt-1  text-sm text-gray-400'>
            You haven’t created any designs yet.
          </div>
        </div>
      )}
    </div>
  );
};

export const HistoryList = () => {
  const { openDialog, handleClose, handleOpen } = useDialog();

  return (
    <div>
      <BottomSheet open={openDialog} onClose={handleClose}>
        <BottomSheet.Content>
          <HistoryDetails />
        </BottomSheet.Content>
      </BottomSheet>
      <button
        onClick={handleOpen}
        className='h-10 w-10 flex items-center justify-center bg-button rounded-full'
      >
        <ClockIcon className='h-6 w-6 text-white' />
      </button>
    </div>
  );
};
