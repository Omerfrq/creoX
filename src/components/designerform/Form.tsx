/* eslint-disable @next/next/no-img-element */
import { classNames } from '@/src/utils/helpers';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RadioGroup } from '@headlessui/react';
import { useAI } from '@/src/hooks/useAI';
import Image from 'next/image';
import { useAppSelector } from '@/src/redux/store';
import { ComingSoon } from './ComingSoon';
import { DESIGN_TYPES } from '@/src/utils/const';
import { CakeAIData } from '@/src/types/helpers';
import BottomSheet from '../common/BottomSheet';
import Output from './Output';

export const DesignerForm = () => {
  const {
    setValue,
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CakeAIData>({
    defaultValues: {
      category: 'CAKE',
      design: 0,
    },
  });

  const [open, setOpen] = useState(false);

  const [payload, setPayload] = useState<CakeAIData | null>(null);

  const { user } = useAppSelector((state) => state.storeSlice);

  const currentTab = watch('category');

  const { design } = watch();

  const { mutation, reset } = useAI();

  const setCurrentTab = (category: string) => {
    setValue('category', category);
  };

  const onSubmit = (data: CakeAIData) => {
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
      <div className='flex-1 h-[70%] '>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} id='cake-ai-form'>
            <div>
              <div className='mt-7'>
                <div className='flex space-x-3 items-center justify-between'>
                  <div className='flex flex-col items-center space-y-2'>
                    <button
                      type='button'
                      onClick={() => setCurrentTab('CAKE')}
                      className={classNames(
                        'p-3 flex-shrink-0 rounded-lg text-sm font-semibold leading-5 text-gray-700',
                        currentTab === 'CAKE'
                          ? 'drop-shadow-md ring-2 ring-indigo-500 bg-indigo-200/10 shadow-indigo-500 '
                          : 'text-gray-500 text-sm bg-gray-200/10 '
                      )}
                    >
                      <div className='flex h-full w-full gap-x-1 items-center justify-center relative'>
                        <Image
                          alt=''
                          className='h-12 w-12'
                          height={40}
                          width={40}
                          src='/cake.svg'
                        />
                      </div>
                    </button>
                    <div className='text-white text-sm font-semibold'>Cake</div>
                  </div>
                  <div className='flex flex-col items-center space-y-2'>
                    <button
                      type='button'
                      onClick={() => setCurrentTab('Chocolates')}
                      className={classNames(
                        'p-3 flex-shrink-0 rounded-lg  text-sm font-semibold leading-5 text-gray-700',
                        currentTab === 'Chocolates'
                          ? 'drop-shadow-md ring-2 ring-indigo-500 bg-indigo-200/10 shadow-indigo-500 '
                          : 'text-gray-500 text-sm bg-gray-200/10 hover:bg-white/[0.12] hover:text-white'
                      )}
                    >
                      <div className='flex h-full w-full gap-x-1 items-center justify-center relative'>
                        <Image
                          alt=''
                          className='h-12 w-12'
                          height={40}
                          width={40}
                          src='/chocolate.svg'
                        />
                      </div>
                    </button>
                    <div className='text-white text-sm font-semibold'>
                      Chocolates
                    </div>
                  </div>
                  <div className='flex flex-col items-center space-y-2'>
                    <button
                      type='button'
                      onClick={() => setCurrentTab('T-Shirt')}
                      className={classNames(
                        'p-3 flex-shrink-0 rounded-lg text-sm font-semibold leading-5 text-gray-700',
                        currentTab === 'T-Shirt'
                          ? 'drop-shadow-md ring-2 ring-indigo-500 bg-indigo-200/10 shadow-indigo-500 '
                          : 'text-gray-500 text-sm bg-gray-200/10 hover:bg-white/[0.12] hover:text-white'
                      )}
                    >
                      <div className='flex h-full w-full gap-x-1 items-center justify-center relative'>
                        <Image
                          alt=''
                          className='h-12 w-12'
                          height={40}
                          width={40}
                          src='/tshirt.svg'
                        />
                      </div>
                    </button>
                    <div className='text-white text-sm font-semibold'>
                      T-Shirts
                    </div>
                  </div>
                  <div className='flex flex-col items-center space-y-2'>
                    <button
                      type='button'
                      onClick={() => setCurrentTab('Decoration')}
                      className={classNames(
                        'p-3 flex-shrink-0 rounded-lg  text-sm font-semibold leading-5 text-gray-700',
                        currentTab === 'Decoration'
                          ? 'drop-shadow-md ring-2 ring-indigo-500 bg-indigo-200/10 shadow-indigo-500 '
                          : 'text-gray-500 text-sm bg-gray-200/10 hover:bg-white/[0.12] hover:text-white'
                      )}
                    >
                      <div className='flex h-full w-full gap-x-1 items-center justify-center relative'>
                        <Image
                          alt=''
                          className='h-12 w-12'
                          height={40}
                          width={40}
                          src='/decor.svg'
                        />
                      </div>
                    </button>
                    <div className='text-white text-sm font-semibold'>
                      Decorations
                    </div>
                  </div>
                </div>
                {currentTab === 'CAKE' ? (
                  <div className='mt-5'>
                    <div
                      className={classNames(
                        'rounded-xl ',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-500 focus:outline-none focus:ring-2'
                      )}
                    >
                      <div className='font-semibold text-white'>
                        Describe your project (English only)
                      </div>
                      <textarea
                        rows={4}
                        {...register('prompt', {
                          required: true,
                        })}
                        aria-invalid={errors.prompt ? 'true' : 'false'}
                        required={!!errors.prompt}
                        className={classNames(
                          'mt-4 placeholder:leading-5 text-white placeholder:text-sm  bg-gray-50/20 resize-none rounded-md w-full border-0 invalid:ring-2 invalid:ring-red-500 focus:invalid:ring-red-500 hover:ring-indigo-500 focus:ring-2 focus:ring-inset  ring-0'
                        )}
                      />
                    </div>
                    <RadioGroup
                      value={design}
                      onChange={(value) => {
                        setValue('design', value);
                      }}
                    >
                      <RadioGroup.Label className='text-base font-semibold leading-6 text-white mt-5 block'>
                        Design Complexity
                      </RadioGroup.Label>
                      <RadioGroup.Description className='text-sm text-gray-500'>
                        The complex level affects the price of goods{' '}
                      </RadioGroup.Description>

                      <div className='mt-4 grid grid-cols-3 gap-x-4'>
                        {DESIGN_TYPES.map((design) => (
                          <RadioGroup.Option
                            key={design.code}
                            value={design.code}
                            className={({ active, checked }) =>
                              classNames(
                                'p-3 flex-shrink-0 flex items-center justify-center rounded-lg  text-sm font-semibold leading-5 text-gray-700',
                                active || checked
                                  ? 'drop-shadow-md ring-2 ring-indigo-500 bg-indigo-200/10 shadow-indigo-500 '
                                  : 'text-gray-500 text-sm bg-gray-200/10'
                              )
                            }
                          >
                            <span className='flex space-y-2 items-center flex-col'>
                              <RadioGroup.Label
                                as='span'
                                className='block text-sm font-medium text-white'
                              >
                                {design.label}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as='span'
                                className='mt-1 font-normal text-xs text-gray-500 text-center'
                              >
                                {design.price}
                              </RadioGroup.Description>
                            </span>
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                ) : (
                  <ComingSoon />
                )}
              </div>
            </div>
          </form>
          {currentTab === 'CAKE' ? (
            <div>
              <button
                disabled={mutation.isLoading}
                form='cake-ai-form'
                className='mt-7 relative flex items-center justify-center w-full py-2.5 bg-button rounded-md text-white text-2xl font-medium'
              >
                Go
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
