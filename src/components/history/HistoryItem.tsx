import { GenerationHistory } from '@/src/types/helpers';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { HistoryDetails } from './HistoryDetails';
import { useDialog } from '@/src/hooks/useDialog';
import BottomSheet from '../common/BottomSheet';

export const HistoryItem = ({ history }: { history: GenerationHistory }) => {
  const { openDialog, handleClose, handleOpen } = useDialog();
  return (
    <div onClick={handleOpen} className='py-3 w-full'>
      <BottomSheet open={openDialog} onClose={handleClose}>
        <BottomSheet.Content title={history.userPrompt}>
          <HistoryDetails details={history} />
        </BottomSheet.Content>
      </BottomSheet>
      <div className='flex justify-between items-center'>
        <div className='flex items-start space-x-4'>
          <div className='flex-shrink-0'>
            <div className='relative'>
              <img
                className='h-10 w-10 bg-gray-200 rounded-full shadow-sm'
                src={history.url}
                alt=''
              />
              <span
                className='absolute inset-0 rounded-full shadow-inner'
                aria-hidden='true'
              />
            </div>
          </div>
          <div>
            <h1 className='text-base capitalize font-medium text-white line-clamp-1'>
              {history.userPrompt}
            </h1>
            <p className='text-sm font-normal text-gray-300 flex items-center mt-0.5'>
              {history?.category}
            </p>
          </div>
        </div>
        <div>
          <ChevronRightIcon strokeWidth={3} className='h-5 w-5 text-white' />
        </div>
      </div>
    </div>
  );
};
