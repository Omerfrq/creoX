import { classNames } from '@/src/utils/helpers';
import React, { useState, useEffect } from 'react';
import {
  ArrowPathIcon,
  RectangleStackIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

import { LOADING_FACTS } from '@/src/utils/const';
import { Generation } from '@/src/types/helpers';
import { LottieLoader } from '../common/LottieLoader';
import { Preview } from './Preview';
import BottomSheet from '../common/BottomSheet';
import { ComingSoonForm } from '../presignupform/ComingSoonForm';

const categories = [
  {
    name: 'T-Shirt',
    type: 'tshirt',
    image: '/t-shirt.png',
  },
  {
    name: 'Mug',
    type: 'mug',
    image: '/mug.png',
  },
  {
    name: 'Bag',
    type: 'bag',
    image: '/bag.png',
  },
  {
    name: 'Canvas',
    type: 'canvas',
    image: '/canvas.png',
  },
];

interface Props {
  details?: Generation;
  isLoading: boolean;
  onClose(): void;
  onRefresh: () => Promise<void>;
}

const urlToObject = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], 'image.jpg', { type: blob.type });
  return file;
};

async function testWebShare({ text, files: filesUrl }) {
  let files;
  // Test compatibility
  if (navigator.share === undefined) {
    console.log('Unsupported share feature');
    return;
  }

  // Handle file urls
  if (filesUrl && filesUrl.length > 0) {
    const filesGetter = filesUrl.map((file) => urlToObject(file));
    const newFiles = await Promise.all(filesGetter);

    if (!navigator.canShare || !navigator.canShare({ files: newFiles })) {
      console.log('Unsupported share feature');
      return;
    }

    files = newFiles;
  }

  // Share content
  try {
    await navigator.share({ text, files });
  } catch (error) {
    console.log(`Error sharing: ${error}`);
  }
}

const Output = ({ details, isLoading, onClose, onRefresh }: Props) => {
  const { value } = details ?? {};

  console.log(details);

  const imageUrl = value?.[0]?.url;

  const [openModal, setOpenModal] = useState(false);

  const [openKeywordModal, setOpenKeywordModal] = useState(false);

  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isLoadingImage, setIsLoadingImage] = useState(true);

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

  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className='mt-4 px-5 mb-2'>
      <BottomSheet open={openModal} onClose={onCloseModal}>
        <BottomSheet.Content>
          <ComingSoonForm imageUrl={imageUrl as string} />
        </BottomSheet.Content>
      </BottomSheet>

      <BottomSheet
        open={openKeywordModal}
        onClose={() => {
          setOpenKeywordModal(false);
        }}
      >
        <BottomSheet.Content height='auto'>
          <div className='my-5 px-6'>
            <div>Keywords</div>
            <div className='flex mt-4 gap-3 flex-wrap'>
              {details?.keywords.map((keyword) => (
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
        </BottomSheet.Content>
      </BottomSheet>
      <div className='flex h-full flex-col items-center justify-between'>
        <div className='flex flex-col space-y-4 h-full w-full overflow-scroll'>
          <div className='rounded-md relative min-h-[350px]'>
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
                    path: '/blink-loading.json',
                  }}
                />

                <div className='flex w-full h-full flex-col -mt-2'>
                  <div className='animate-pulse w-full h-full max-h-full bg-gray-300' />
                  <p className='text-xl text-center font-medium'>
                    Generating Weirdness....
                  </p>
                </div>

                {LOADING_FACTS.length > 0 && (
                  <div className='text-center text-gray-500 text-sm mt-1'>
                    {LOADING_FACTS[currentFactIndex]}
                  </div>
                )}
              </div>
            )}

            {!isLoading ? (
              <div className='relative mt-4 rounded-md h-[350px] w-full'>
                {!isLoading ? (
                  <img
                    className={classNames(
                      'rounded-md bg-gray-100',
                      isLoadingImage ? 'hidden' : 'block'
                    )}
                    src={imageUrl}
                    alt='Arrived'
                    onLoad={onLoadSuccess}
                  />
                ) : null}
                {!isLoading && isLoadingImage && (
                  <div className='absolute inset-0 animate-pulse z-[99] w-full h-[350px]  max-h-[350px] bg-gray-400 rounded-md' />
                )}
              </div>
            ) : null}

            {isLoading ? (
              <div className='mt-8'>
                <div className='flex justify-between text-white'>
                  <div className='flex items-center justify-center flex-col'>
                    <button
                      onClick={() => {
                        setOpenKeywordModal(true);
                      }}
                      className='flex bg-gray-50/10 items-center justify-center rounded-full w-10 h-10 shadow'
                    >
                      <RectangleStackIcon strokeWidth={2} className='w-5 h-5' />
                    </button>
                    <div className='text-xs mt-2'>Keywords</div>
                  </div>
                  <div className='flex items-center justify-center flex-col'>
                    <button
                      className='flex bg-gray-50/10 items-center justify-center rounded-full w-10 h-10 shadow'
                      type='button'
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    >
                      <ArrowPathIcon strokeWidth={2} className='w-5 h-5' />
                    </button>
                    <div className='text-xs mt-2'>New Version</div>
                  </div>
                  <div className='flex items-center justify-center flex-col'>
                    <button
                      className='flex bg-gray-50/10 items-center justify-center rounded-full w-10 h-10 shadow'
                      onClick={() => {
                        testWebShare({
                          text: 'Weird Collective',
                          files:
                            imageUrl ??
                            'https://dev-medias-bucket-original.s3.amazonaws.com/share/4e79f75e-11ba-4790-b8d2-9be77d738c83.png',
                        });
                      }}
                    >
                      <ShareIcon strokeWidth={2} className='w-5 h-5' />
                    </button>
                    <div className='text-xs mt-2'>Share</div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className='flex items-center justify-center flex-col'>
            <button
              className='flex bg-gray-50/10 items-center justify-center rounded-full w-10 h-10 shadow'
              onClick={() => {
                testWebShare({
                  text: 'Weird Collective',
                  files:
                    imageUrl ??
                    'https://dev-medias-bucket-original.s3.amazonaws.com/share/4e79f75e-11ba-4790-b8d2-9be77d738c83.png',
                });
              }}
            >
              <ShareIcon strokeWidth={2} className='w-5 h-5' />
            </button>
            <div className='text-xs mt-2'>Share</div>
          </div>

          {!isLoading ? (
            <div>
              <div className='my-4'>
                <div className='font-medium text-sm'>Put it on...</div>
              </div>
              <ul className='space-y-4 mb-4'>
                {categories.map((category) => (
                  <Preview
                    category={category}
                    key={category.name}
                    imageUrl={imageUrl as string}
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
