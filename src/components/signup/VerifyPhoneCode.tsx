import { useVerifyUserCode } from '@/src/hooks/useVerifyUserCode';
import { setUser } from '@/src/redux/slice/StoreSlice';
import { classNames } from '@/src/utils/helpers';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import OTPInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import CountdownTimer from './CountDownTimer';
import { useRouter } from 'next/router';
import { Loader } from '../common/Loader';

export const VerifyCode = ({
  phoneNumber,
  handleBack,
  onSuccess,
}: {
  phoneNumber: string;
  handleBack: () => void;
  onSuccess: () => void;
}) => {
  const [code, setCode] = useState('');

  const dispatch = useDispatch();

  const router = useRouter();

  const { mutation } = useVerifyUserCode();

  const [hasError, setError] = useState(false);

  useEffect(() => {
    if (code.length === 4) {
      mutation.mutateAsync(
        {
          phoneNumber,
          code,
        },
        {
          onSuccess: (data) => {
            if (data) {
              if (!data.verified) {
                setError(true);
              } else if (data.isNew) {
                onSuccess();
              } else {
                const payload = {
                  phoneNumber: data.user?.phoneNumber,
                  name: data.user?.name,
                  id: data?.user?.id,
                };
                dispatch(setUser(payload));
                localStorage.setItem('user', JSON.stringify(payload));
                router.push('/generate-project');
              }
            }
          },
        }
      );
    }
  }, [code, dispatch, onSuccess, phoneNumber]);

  return (
    <div className='pt-5'>
      {mutation.isLoading ? <Loader /> : null}

      <div className='pb-5'>
        <button onClick={handleBack}>
          <ArrowLeftIcon className='h-8 w-8' />
        </button>
      </div>
      <h1 className='text-2xl font-semibold'>Verify your Phone number</h1>
      <p className='pb-4 pt-2 text-base text-[#aaa]'>
        We will send you a message with the verification code to {phoneNumber}
      </p>

      <div className='mt-3'>
        <OTPInput
          value={code}
          onChange={(v) => {
            setCode(v.toUpperCase());
            setError(false);
          }}
          numInputs={4}
          inputType='text'
          shouldAutoFocus
          onPaste={(e) =>
            setCode(
              (e.nativeEvent.clipboardData?.getData('text') ?? '')
                .trim()
                .toUpperCase()
            )
          }
          renderInput={(props) => (
            <input
              {...props}
              inputMode='text'
              className={classNames(
                'bg-[#fff1] flex-1 font-semibold text-2xl rounded !w-14 h-24 block ',
                hasError
                  ? '!border !border-red-500'
                  : 'border-none outline-none'
              )}
            />
          )}
          containerStyle='flex  gap-2 mt-4'
        />

        {hasError ? (
          <div className=' text-red-500 mt-2 text-sm'>The code is invalid</div>
        ) : null}

        <div className='mt-8 text-center'>
          <CountdownTimer initialTime={40} />
        </div>
      </div>
    </div>
  );
};
