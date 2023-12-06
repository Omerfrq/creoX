import React from 'react';
import BottomSheet from '../common/BottomSheet';
import { useDialog } from '@/src/hooks/useDialog';
import { GenerationItem } from './GenerationItem';
import { useFetchExamples } from '@/src/hooks/useFetchExamples';

export const Generations = () => {
  const { openDialog, handleClose, handleOpen } = useDialog();

  const { examples } = useFetchExamples();

  return (
    <div>
      <BottomSheet open={openDialog} onClose={handleClose}>
        <BottomSheet.Content height='h-[90%]'>
          <div className='p-4 mt-4'>
            <div className='text-white'>Some Examples</div>
            <div className='text-gray-500'>Click to get details Info</div>
            <div className='my-5'>
              <ul role='list' className='grid grid-cols-2 gap-x-4 gap-y-4'>
                {examples?.map((generation) => (
                  <GenerationItem key={generation.id} generation={generation} />
                ))}
              </ul>
            </div>
          </div>
        </BottomSheet.Content>
      </BottomSheet>
      <div className='text-white my-4 font-normal'>
        No ideas?{' '}
        <button
          onClick={handleOpen}
          type='button'
          className='ml-1 text-primary'
        >
          View Some Examples
        </button>
      </div>
    </div>
  );
};
