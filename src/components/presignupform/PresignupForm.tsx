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

export const PresignForm = ({
  imageUrl,
  category,
}: {
  imageUrl: string;
  category: { name: string; type: string; image: string };
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userId } = useAppSelector((state) => state.storeSlice);

  const { mutation } = usePreSignup();
  const router = useRouter();

  const onSubmit = (data: any) => {
    if (imageUrl) {
      const payload = {
        emailAddress: data.emailAddress,
        generations: [imageUrl],
        productCategory: category.type,
        userId,
      };
      mutation.mutateAsync(payload, {
        onSuccess: () => {
          router.push('/success');
        },
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {mutation.isLoading ? <Loader /> : null}
      <div className='flex flex-col h-[90vh] justify-between px-6'>
        <div className='flex mt-8 flex-1 flex-col    rounded-md '>
          <div className='relative flex items-center justify-center '>
            <img className='h-56 w-72' src={category.image} alt='' />
            <img
              className={classNames(
                'absolute rounded-md ',
                category.type === 'mug' ? 'mr-9 mt-5 h-20 w-20 ' : 'h-28 w-28',
                category.type === 'bag' ? ' mt-[66px] h-24 w-24 ' : 'h-28 w-28'
              )}
              src={
                'https://dev-medias-bucket-original.s3.amazonaws.com/share/b9e364ec-941a-4932-a017-c4c4756554ba.png' ??
                imageUrl
              }
              alt=''
            />
          </div>
          <div
            className={`${sigmar.variable} mt-7 text-center text-2xl font-sigmarOne font-semibold `}
          >
            Coming Soon
          </div>
          <div className='text-center mt-3 text-gray-400'>
            Signup now and we will notify when you can get on {category.name}
          </div>
          <div className='mt-4'>
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
                  'block bg-[#fff1] w-full rounded-full border-0 py-3.5 pl-14 font-semibold text-white shadow-sm  placeholder:text-gray-400 placeholder:font-normal focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
                  errors?.emailAddress
                    ? ' focus:ring-red-600'
                    : 'focus:ring-indigo-600'
                )}
                placeholder='Email Address'
              />
            </div>
          </div>
        </div>

        <div>
          <button className='flex items-center disabled:bg-gray-200/20 justify-center w-full py-3.5 bg-primary rounded-full text-black text-sm font-normal'>
            Notify Me
          </button>
        </div>
      </div>
    </form>
  );
};
