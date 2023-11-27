import { classNames } from '@/src/utils/helpers';
import React, { useState, useEffect } from 'react';
import { ArrowPathIcon, PencilIcon } from '@heroicons/react/24/outline';

import { useFetchVendors } from '@/src/hooks/useFetchVendors';
// import { Vendor } from '@/src/components/DesignerForm/Vendor';
import { LOADING_FACTS } from '@/src/utils/const';
import { CakeAI, CakeAIData } from '@/src/types/helpers';
import { LottieLoader } from '../common/LottieLoader';
import { Vendor } from '../vendors/Vendor';

interface Props {
  details?: CakeAI | null;
  isLoading: boolean;
  onClose(): void;
  onRefresh: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  payload: CakeAIData | null;
}

const Output = ({ details, isLoading, onClose, onRefresh, payload }: Props) => {
  const { imageUrls } = details ?? {};

  const imageUrl = imageUrls?.[0];

  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const { data = [] } = useFetchVendors();

  useEffect(() => {
    const i = setInterval(() => {
      setCurrentFactIndex((value) =>
        value + 1 === LOADING_FACTS.length ? 0 : value + 1
      );
    }, 5000);

    return () => {
      clearInterval(i);
    };
  }, []);

  const onLoadSuccess = () => {
    setIsLoadingImage(false);
  };

  return (
    <div className='mt-4 px-5 mb-2'>
      <div className='flex h-full flex-col items-center justify-between'>
        <div className='flex flex-col space-y-4 h-full w-full overflow-scroll'>
          <div className='rounded-md relative min-h-[390px]'>
            {isLoading && (
              <div>
                <LottieLoader
                  height='340px'
                  config={{
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid meet',
                    },
                    autoplay: true,
                    loop: true,
                    path: 'https://lottie.host/5554e3b2-9c98-4a33-8bd8-f0c3c3da0222/fR8ZDWX0SQ.json',
                  }}
                />

                <div className='flex w-full h-full flex-col mt-3'>
                  <div className='animate-pulse w-full h-full max-h-full bg-gray-300' />
                  <p className='text-sm text-center font-medium'>
                    Hold tight. Almost there.
                  </p>
                </div>

                {LOADING_FACTS.length > 0 && (
                  <div className='text-center text-gray-500 text-sm mt-1'>
                    {LOADING_FACTS[currentFactIndex]}
                  </div>
                )}
              </div>
            )}

            <div className='relative rounded-md h-[390px] w-full'>
              {details && !isLoadingImage ? (
                <div className='px-3 absolute top-2 right-0'>
                  <div className='flex space-x-3 text-gray-900'>
                    <button
                      className='flex bg-white items-center justify-center rounded-full w-10 h-10 shadow'
                      onClick={onClose}
                    >
                      <PencilIcon strokeWidth={2} className='w-5 h-5' />
                    </button>
                    <button
                      className='flex bg-white items-center justify-center rounded-full w-10 h-10 shadow'
                      type='button'
                      onClick={() => {
                        setIsLoadingImage(true);
                        onRefresh();
                      }}
                    >
                      <ArrowPathIcon strokeWidth={2} className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              ) : null}
              {!isLoading && details ? (
                <img
                  className={classNames(
                    'rounded-md bg-gray-100',
                    isLoadingImage ? 'hidden' : 'block'
                  )}
                  src={imageUrl}
                  alt='Arrived'
                  onLoad={onLoadSuccess}
                  onError={(e) => (e.currentTarget.src = imageUrl ?? '')}
                />
              ) : null}
              {!isLoading && isLoadingImage && (
                <div className='absolute inset-0 animate-pulse z-[99] w-full h-[390px]  max-h-[390px] bg-gray-400 rounded-md' />
              )}
            </div>
          </div>

          {!isLoading ? (
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
                    imageUrl={imageUrl}
                    key={vendor.id}
                    payload={payload}
                  />
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Output;
