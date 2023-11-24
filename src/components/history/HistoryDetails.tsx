import { classNames } from '@/src/utils/helpers';
import React, { useState } from 'react';

import { useFetchVendors } from '@/src/hooks/useFetchVendors';
// import { Vendor } from '@/src/components/DesignerForm/Vendor';
import { GenerationHistory } from '@/src/types/helpers';
import { Vendor } from '../vendors/Vendor';

export const HistoryDetails = ({ details }: { details: GenerationHistory }) => {
  const { url } = details ?? {};

  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const { data = [] } = useFetchVendors();

  const onLoadSuccess = () => {
    setIsLoadingImage(false);
  };

  return (
    <div className='mt-4 px-5 mb-2'>
      <div className='flex h-full flex-col items-center justify-between'>
        <div className='flex flex-col space-y-4 h-full w-full overflow-scroll'>
          <div className='rounded-md'>
            <div className='relative rounded-md h-[390px] w-full'>
              <img
                className={classNames(
                  'rounded-md bg-gray-100',
                  isLoadingImage ? 'hidden' : 'block'
                )}
                src={url}
                alt='Arrived'
                onLoad={onLoadSuccess}
                onError={(e) => (e.currentTarget.src = imageUrl ?? '')}
              />
            </div>
          </div>

          <div>
            <div className='mb-2'>
              <div className='font-medium text-sm'>Vendors</div>
              <div className='text-sm text-gray-500'>
                Vendors that can make this for you
              </div>
            </div>
            <ul className=' divide-y divide-pink-300 mb-10'>
              {data.map((vendor) => (
                <Vendor
                  vendor={vendor}
                  imageUrl={url}
                  key={vendor.id}
                  payload={details}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
