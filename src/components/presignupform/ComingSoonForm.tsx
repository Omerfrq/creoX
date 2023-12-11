import { usePreSignup } from '@/src/hooks/usePreSignup';
import { classNames } from '@/src/utils/helpers';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { Sigmar_One } from 'next/font/google';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Loader } from '../common/Loader';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/src/redux/store';

const sigmar = Sigmar_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-sigmar',
});

export const ComingSoonForm = ({
  imageUrl,
  type,
}: {
  imageUrl?: string;
  type?: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { mutation } = usePreSignup();
  const { userId } = useAppSelector((state) => state.storeSlice);

  const onSubmit = (data: any) => {
    const payload = {
      emailAddress: data.emailAddress,
      productCategory: type ?? 'tshirt',
      imageUrl,
      guestId: userId,
    };
    mutation.mutateAsync(payload, {
      onSuccess: () => {
        router.push('/success');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {mutation.isLoading ? <Loader /> : null}
      <div className='flex flex-col h-[90vh] justify-between'>
        <div className='flex  flex-1 flex-col    rounded-md '>
          <div className='relative flex-col flex items-center justify-center '>
            <img className=' w-full' src={'/comingsoon2.svg'} alt='' />
            <div
              className={`${sigmar.variable} mt-4 text-center text-2xl font-sigmarOne px-6 font-semibold `}
            >
              Coming Soon
            </div>
            <div className='text-center px-6  mt-3 text-gray-400'>
              {type === 'credit'
                ? 'Signup now and we will notify when you can generate more credits.'
                : 'Signup now and we will notify when you can get more images.'}
            </div>
          </div>
          <div className='mt-2 px-6'>
            <div className='relative mt-2 rounded-md shadow-sm'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
                <EnvelopeIcon
                  className='h-7 w-7 text-pink-500'
                  aria-hidden='true'
                />
              </div>
              <input
                type='email'
                {...register('emailAddress', {
                  required: true,
                })}
                className={classNames(
                  'block bg-[#fff1] w-full mt-4 rounded-full border-0 py-3.5 pl-14 font-semibold text-white shadow-sm  placeholder:text-gray-400 placeholder:font-normal focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
                  errors?.emailAddress
                    ? ' focus:ring-red-600'
                    : 'focus:ring-indigo-600'
                )}
                placeholder='Email Address'
              />
            </div>
          </div>
        </div>

        <div className='px-6 mb-4'>
          <button className='flex items-center disabled:bg-gray-200/20 justify-center w-full py-3.5 bg-primary rounded-full text-black text-sm font-normal'>
            Notify Me
          </button>
        </div>
      </div>
    </form>
  );
};
