import { useDialog } from '@/src/hooks/useDialog';
import { Generation } from '@/src/types/helpers';
import Image from 'next/image';
import { useState } from 'react';
import BottomSheet from '../common/BottomSheet';
import copyToClipboard from 'copy-to-clipboard';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export const GenerationItem = ({ generation }: { generation: Generation }) => {
  const [copy, setCopy] = useState(false);

  const { openDialog, handleClose, handleOpen } = useDialog();
  const copyText = () => {
    copyToClipboard(generation.value[0].url);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  return (
    <BottomSheet.NestedSheet>
      <li className='relative shadow-sm'>
        <BottomSheet.Content height='70%'>
          <div className='px-6 py-4'>
            <BottomSheet onClose={handleClose} open={openDialog}>
              <BottomSheet.Content height='auto'>
                <div className='px-4 py-5 w-full'>
                  <div className='mt-1 flex rounded-md shadow-sm '>
                    <input
                      value={generation.value[0].shareUrl}
                      disabled
                      type='text'
                      name='company-website'
                      id='company-website'
                      className='text-white bg-gray-50/10 w-full focus:ring-2 p-4 rounded-l-md  outline-none  border-0 focus:ring-indigo-500'
                      placeholder='www.example.com'
                    />
                    <button
                      onClick={copyText}
                      className='flex  bg-gray-50/10 items-center px-3 rounded-r-md border-l border-gray-50/20   text-sm'
                    >
                      {copy ? (
                        <p className='flex items-center text-sm '>
                          <CheckCircleIcon
                            className='h-6 w-6 flex-shrink-0 text-green-400'
                            aria-hidden='true'
                          />
                        </p>
                      ) : null}
                      <span className='ml-2'>{copy ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </BottomSheet.Content>
            </BottomSheet>
            <div className='relative rounded-md h-[280px] w-full'>
              <Image
                layout='fill'
                unoptimized
                className={'rounded-md h-full w-full  block'}
                src={generation.value[0].url}
                alt='Arrived'
              />
            </div>
            <div className='mt-5'>
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
              <button
                className='flex mt-4 items-center disabled:bg-gray-200/20 justify-center w-full py-3.5 bg-primary rounded-full text-black text-sm font-normal'
                onClick={handleOpen}
              >
                {' '}
                Share
              </button>
            </div>
          </div>
        </BottomSheet.Content>
        <BottomSheet.Button asChild>
          <div
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
        </BottomSheet.Button>
      </li>
    </BottomSheet.NestedSheet>
  );
};
