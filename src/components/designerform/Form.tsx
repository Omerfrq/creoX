/* eslint-disable @next/next/no-img-element */
import { classNames } from '@/src/utils/helpers';
import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useAI } from '@/src/hooks/useAI';
import { useAppSelector } from '@/src/redux/store';
import { CakeAIData } from '@/src/types/helpers';
import BottomSheet from '../common/BottomSheet';
import Output from './Output';
import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid';

export const DesignerForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ keywords: any[]; category: string }>({
    defaultValues: {
      category: 'TSHIRT',
      keywords: ['TShirt'],
    },
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'keywords',
  });

  const [open, setOpen] = useState(false);

  const [payload, setPayload] = useState<CakeAIData | null>(null);

  const { user } = useAppSelector((state) => state.storeSlice);

  const { mutation, reset } = useAI();

  const onSubmit = (data) => {
    setPayload(data);

    setOpen(true);

    const sentPayload = {
      ...data,
      userId: user?.id,
    };

    mutation.mutate(sentPayload);
  };

  const onCloseBottomSheet = () => {
    setOpen(false);
    reset();
  };

  return (
    <div className='flex-1 h-full justify-between flex-col'>
      <BottomSheet open={open} onClose={onCloseBottomSheet}>
        <BottomSheet.Content title={'Cake'} onClose={onCloseBottomSheet}>
          <Output
            details={mutation?.data}
            isLoading={mutation.isLoading}
            onClose={onCloseBottomSheet}
            onRefresh={handleSubmit(onSubmit)}
            payload={payload}
          />
        </BottomSheet.Content>
      </BottomSheet>
      <div className='flex-1 h-[70%] relative'>
        <form onSubmit={handleSubmit(onSubmit)} id='cake-ai-form'>
          <div>
            <div className='font-semibold text-white'>
              Please enter keywords to describe your T-shirt.
            </div>
            <div className='my-7'>
              <div>
                {fields.map((item, index) => (
                  <div key={item.id}>
                    <div className='relative mt-7 rounded-md shadow-sm'>
                      <Controller
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <input
                            className={classNames(
                              'block bg-[#fff1] w-full rounded-md border-0 py-3.5 font-semibold text-white shadow-sm  placeholder:text-gray-400 placeholder:font-normal focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
                              errors?.keywords?.[`${index}`]
                                ? ' focus:ring-red-600'
                                : 'focus:ring-indigo-600'
                            )}
                            {...field}
                          />
                        )}
                        name={`keywords.${index}`}
                        control={control}
                      />
                      <button
                        type='button'
                        onClick={() => remove(index)}
                        className='absolute rounded-md inset-y-0 right-0 flex items-center px-3'
                      >
                        <TrashIcon
                          className='h-5 w-5 text-purple-400'
                          aria-hidden='true'
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex flex-col space-y-2 items-center mt-6 justify-center'>
                <button
                  type='button'
                  onClick={() => {
                    append('');
                  }}
                  className='rounded-md w-full items-center space-x-3 flex justify-center bg-[#fff1] px-2 py-3.5 text-white border border-dashed shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  <PlusIcon className='h-5 w-5' aria-hidden='true' />
                  <span className='text-sm'>Add Field</span>
                </button>
              </div>
            </div>
          </div>
        </form>

        <button
          disabled={mutation.isLoading}
          form='cake-ai-form'
          className='flex items-center justify-center w-full py-2.5 bg-button rounded-md text-white text-2xl font-medium'
        >
          Go
        </button>
      </div>
    </div>
  );
};
