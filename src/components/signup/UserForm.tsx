import { useCreateUser } from '@/src/hooks/useCreateUser';
import { setAlert } from '@/src/redux/slice/AlertSlice';
import { setUser } from '@/src/redux/slice/StoreSlice';
import { useAppDispatch } from '@/src/redux/store';
import { classNames } from '@/src/utils/helpers';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Loader } from '../common/Loader';

export const UserForm = ({ phoneNumber }: { phoneNumber: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    firstName: string;
    lastName: string;
  }>();

  const dispatch = useAppDispatch();

  const router = useRouter();

  const { mutation } = useCreateUser();
  const onSubmit: SubmitHandler<{
    firstName: string;
    lastName: string;
  }> = (data) => {
    const { firstName, lastName } = data;
    mutation.mutateAsync(
      {
        user: {
          firstName,
          lastName,
          phoneNumber: `+${phoneNumber}`,
        },
      },
      {
        onSuccess: (data) => {
          if (data) {
            const payload = {
              phoneNumber: data.phoneNumber,
              name: data.name,
              id: data.id,
            };
            dispatch(setUser(payload));
            localStorage.setItem('user', JSON.stringify(payload));
            router.push('/generate-project');
          }
        },
        onError: (error) => {
          dispatch(
            setAlert({
              type: 'error',
              message: error?.error_description,
            })
          );
        },
      }
    );
  };

  return (
    <div className='pt-10 w-full'>
      {mutation.isLoading ? <Loader /> : null}

      <h1 className='text-2xl font-semibold'>What do you go by?</h1>
      <p className='pb-8 pt-3 text-base text-[#aaa]'>
        You Phonenumber has been verified
      </p>
      <form className='w-full space-y-8' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='firstName' className='text-sm  dark:text-white'>
            First Name
          </label>

          <div className='mt-2'>
            <input
              type='text'
              {...register('firstName', {
                required: true,
              })}
              id='firstName'
              className={classNames(
                'block bg-[#fff1] w-full rounded-md border-0 py-3.5 font-semibold text-white shadow-sm  placeholder:text-gray-400 placeholder:font-normal focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
                errors?.firstName
                  ? ' focus:ring-red-600'
                  : 'focus:ring-indigo-600'
              )}
              placeholder='John'
            />
          </div>
        </div>

        <div>
          <label htmlFor='lastName' className='text-sm  dark:text-white'>
            Last Name
          </label>

          <div className='mt-2'>
            <input
              type='text'
              {...register('lastName', {
                required: true,
              })}
              id='lastName'
              className={classNames(
                'block bg-[#fff1] w-full rounded-md border-0 py-3.5 font-semibold text-white shadow-sm  placeholder:text-gray-400 placeholder:font-normal focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
                errors?.lastName
                  ? ' focus:ring-red-600'
                  : 'focus:ring-indigo-600'
              )}
              placeholder='Doe'
            />
          </div>
        </div>

        <button
          className={classNames(
            'w-full px-12 py-4 rounded-md mt-8 font-semibold',
            Object.keys(errors).length === 0
              ? 'btn-bg-gradient '
              : 'bg-gray-600/90 text-white bg-opacity-95 '
          )}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
