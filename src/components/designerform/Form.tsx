/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAI } from '@/src/hooks/useAI';
import BottomSheet from '../common/BottomSheet';
import Output from './Output';
import { PlusIcon } from '@heroicons/react/20/solid';
import { Sigmar_One } from 'next/font/google';
import { classNames } from '@/src/utils/helpers';
import { useGenerationDetails } from '@/src/hooks/useGenerationDetails';
import { BuyCredits } from '../common/BuyCredits';
import { Generations } from '../generation/ViewExamples';

const sigmar = Sigmar_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-sigmar',
});

export const DesignerForm = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<{ keyword: string; category: string }>({
    defaultValues: {
      category: 'TSHIRT',
      keyword: undefined,
    },
  });

  const [error, setError] = useState(false);
  const [id, setId] = useState();

  const [enabled, setEnabled] = useState(false);

  const [openForm, setOpenForm] = useState(false);

  const [fields, setFields] = useState<any>([]);

  const [open, setOpen] = useState(false);

  const handleAddKeyword = (data) => {
    const newFields = fields?.length
      ? [...fields, data.keyword]
      : [data.keyword];

    setFields(newFields);
    setValue('keyword', '');
    setOpenForm(false);
  };

  const removeFields = (keyword: any) => {
    const newFields = fields.filter((f) => f !== keyword);
    setFields(newFields);
  };

  const { mutation } = useAI();

  const { loading, data, setLoading, isError } = useGenerationDetails({
    id,
    enabled,
  });

  const onSubmit = () => {
    setLoading(true);

    const sentPayload = {
      keywords: fields,
      category: 'TSHIRT',
      style: 'vivid',
    };

    setOpen(true);

    mutation.mutateAsync(sentPayload, {
      onSuccess: (data) => {
        if (data?.status !== 'error') {
          setId(data.id);
          setEnabled(true);
        } else {
          setLoading(false);
          setEnabled(false);
          setError(true);
        }
      },
    });
  };

  const onCloseBottomSheet = () => {
    setOpen(false);
  };

  return (
    <>
      <BottomSheet open={openForm} onClose={() => setOpenForm(false)}>
        <BottomSheet.Content
          title='Add Keyword'
          height='auto'
          onClose={() => setOpenForm(false)}
        >
          <form onSubmit={handleSubmit(handleAddKeyword)}>
            <div className='pb-4 px-4'>
              <Controller
                name={'keyword'}
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <input
                    autoFocus
                    className={classNames(
                      'text-white bg-gray-50/10 w-full focus:ring-2 p-4 rounded-md capitalize outline-none  border-0',
                      errors.keyword
                        ? 'focus:ring-red-500'
                        : 'focus:ring-indigo-500'
                    )}
                    {...field}
                  />
                )}
              />

              <button className='flex items-center mt-4 justify-center w-full py-2.5 bg-primary rounded-full text-black text-sm font-normal'>
                Add Keyword
              </button>
            </div>
          </form>
        </BottomSheet.Content>
      </BottomSheet>
      <BottomSheet open={open} onClose={onCloseBottomSheet}>
        <BottomSheet.Content>
          {/* {error || isError ? (
            <BuyCredits onClose={onCloseBottomSheet} />
          ) : ( */}
          <Output
            details={data}
            isLoading={loading || mutation.isLoading}
            onClose={onCloseBottomSheet}
            onRefresh={handleSubmit(onSubmit)}
          />
          {/* )} */}
        </BottomSheet.Content>
      </BottomSheet>
      <div className='flex-1'>
        <div>
          <div className='flex mt-5 items-center justify-between'>
            <div className={`${sigmar.variable}  text-white font-sigmarOne`}>
              {`Let's Begin`}
            </div>
          </div>

          <div className='font-normal mt-3 text-sm text-white'>
            Enter 3-6 keywords for things you like (i.e. Viking, Lakers)
          </div>
          <div className='space-y-4 mt-4'>
            <div>
              {fields.length ? (
                <div className='flex gap-3 flex-wrap'>
                  {fields.map((keyword: string) => (
                    <span
                      key={keyword}
                      className='inline-flex items-center rounded-full bg-gray-50/10 px-4 py-2 text-xs font-normal text-white ring-1 ring-inset ring-gray-500/10'
                    >
                      <span className='text-white capitalize bg-transparent focus:ring-0 p-0 text-sm outline-none  border-0'>
                        {keyword}
                      </span>

                      <button
                        onClick={() => {
                          removeFields(keyword);
                        }}
                        type='button'
                        className='group ml-2 -mr-1.5 bg-gray-50/20 rounded-full relative h-6 w-6  hover:bg-gray-50/10'
                      >
                        <span className='sr-only'>Remove</span>
                        <svg
                          viewBox='0 0 14 14'
                          className='h-6 w-6 stroke-white '
                        >
                          <path d='M4 4l6 6m0-6l-6 6' />
                        </svg>
                        <span className='absolute -inset-1' />
                      </button>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className='flex flex-col items-center justify-center'>
              <button
                type='button'
                onClick={() => {
                  setOpenForm(true);
                }}
                className='rounded-full w-full items-center space-x-3 flex justify-center  px-2 py-3.5 text-primary border border-primary shadow-sm'
              >
                <PlusIcon className='h-5 w-5' aria-hidden='true' />
                <span className='text-sm'>Keyword</span>
              </button>
            </div>
            {/* <div className='pt-4'>
              <div className='text-white'>What's style</div>
              <div className='mt-3'>
                <div className='flex relative p-2.5 items-center bg-gray-50/10 space-x-3 rounded-2xl'>
                  <div className='flex items-center justify-center w-14 h-14  rounded-md bg-primary'>
                    <div className='relative flex items-center justify-center '>
                      <img className='h-10 w-12' src='/t-shirt.png' alt='' />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <div className='flex space-x-3 items-center'>
                      <p className='text-sm font-normal text-white'>
                        Any Style
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className='w-full text-center'>
        <Generations />
        <button
          onClick={onSubmit}
          disabled={fields.length < 3 || fields.length > 6}
          className='flex items-center disabled:bg-gray-200/20 justify-center w-full py-3.5 bg-primary rounded-full text-black text-sm font-normal'
        >
          Get Weird
        </button>
      </div>
    </>
  );
};
