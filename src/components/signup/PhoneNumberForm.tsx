import { useGenerateVerifyUserCode } from '@/src/hooks/useGenerateVerifyUserCode';
import { classNames } from '@/src/utils/helpers';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { Dispatch, SetStateAction, useState, FormEvent } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export const PhoneForm = ({
  code,
  setCode,
  onSuccess,
}: {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  onSuccess: () => void;
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { isLoading } = useGenerateVerifyUserCode({
    phoneNumber: code,
    enabled: formSubmitted,
    lang: 'en',
    onSuccess,
  });

  const isValid = () => {
    const updateCode = `+${code}`;
    const valid = isValidPhoneNumber(updateCode);

    return valid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
  };
  return (
    <div className='pt-10'>
      <h1 className='text-2xl font-semibold'>Enter your Phone number</h1>
      <p className='pb-8 pt-3 text-base text-[#aaa]'>
        We will send you a message with a one-time verification code
      </p>
      <form className='w-full' onSubmit={handleSubmit}>
        <label htmlFor='phoneNumber' className='text-sm  dark:text-white'>
          Phone Number
        </label>

        <div className='mt-3'>
          <PhoneInput
            buttonClass='!bg-transparent !ml-2 !border-none'
            inputClass='!border-none font-sans !bg-[#fff1] px-4 shadow-lg focus:ring-2 focus:ring-inset focus:ring-indigo-500 font-semibold ring-purple-700 text-white'
            disableDropdown
            value={code}
            onChange={(value) => {
              setCode(value);
            }}
            inputProps={{
              name: 'phoneNumber',
              autoFocus: true,
              required: true,
            }}
            inputStyle={{
              width: '100%',
              height: 60,
              fontSize: '18px',
            }}
            country={'sa'}
          />
        </div>

        <button
          className={classNames(
            'w-full px-12 py-4 rounded-md mt-8 font-semibold',
            isValid()
              ? 'btn-bg-gradient '
              : 'bg-gray-600/90 text-white bg-opacity-95 '
          )}
          disabled={!isValid()}
        >
          {isLoading ? 'Sending...' : 'Send Code'}
        </button>
      </form>
    </div>
  );
};
