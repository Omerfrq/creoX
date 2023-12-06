import { useDialog } from '@/src/hooks/useDialog';
import { Generation } from '@/src/types/helpers';
import Image from 'next/image';
import React from 'react';
import BottomSheet from '../common/BottomSheet';

export const GenerationItem = ({ generation }: { generation: Generation }) => {
  const { openDialog, handleClose, handleOpen } = useDialog();
  return (
    <li className='relative shadow-sm'>
      <BottomSheet open={openDialog} onClose={handleClose}>
        <BottomSheet.Content height='auto'>
          <div className='px-6 py-4'>
            <div className='relative rounded-md h-[310px] w-full'>
              <Image
                layout='fill'
                unoptimized
                className={'rounded-md bg-gray-100 block'}
                src={generation.value[0].url}
                alt='Arrived'
              />
            </div>
            <div className='my-5'>
              <div>Keywords</div>
              <div className='flex mt-4 gap-3 flex-wrap'>
                {generation.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className='inline-flex items-center rounded-full bg-gray-50/10 px-4 py-2 text-xs font-normal text-white ring-1 ring-inset ring-gray-500/10'
                  >
                    <span className='text-white capitalize bg-transparent focus:ring-0 p-0 text-sm outline-none  border-0'>
                      {keyword}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </BottomSheet.Content>
      </BottomSheet>
      <div
        onClick={handleOpen}
        className={
          'aspect-square group block w-full overflow-hidden rounded-lg bg-gray-100'
        }
      >
        <Image
          layout='fill'
          unoptimized
          src={generation.value[0].url}
          alt=''
          className={'pointer-events-none rounded-md object-cover'}
        />
      </div>
    </li>
  );
};
