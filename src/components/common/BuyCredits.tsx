import Image from 'next/image';
import React from 'react';

export const BuyCredits = ({ onClose }) => {
  return (
    <div className='p-4 h-[95vh] flex items-center flex-col justify-between'>
      <div className='flex items-center flex-col justify-center flex-1'>
        <Image height={300} width={300} src='/buy-credits.svg' alt='' />
        <div className='text-center mt-4'>
          You don’t have enough credit. Buy some credits now?
        </div>
      </div>
      <div className='w-full space-y-4 '>
        <button
          type='button'
          className='flex items-center disabled:bg-gray-200/20 justify-center w-full py-3.5 bg-primary rounded-full text-black text-sm font-normal'
        >
          Buy Credits
        </button>
        <button
          type='button'
          onClick={onClose}
          className='flex items-center text-primary justify-center w-full py-3.5 border border-primary rounded-full text-sm font-normal'
        >
          Maybe next time
        </button>
      </div>
    </div>
  );
};
