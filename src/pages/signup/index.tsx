import Head from 'next/head';
import { useState } from 'react';
import { VerifyCode } from '@/src/components/signup/VerifyPhoneCode';
import { PhoneForm } from '@/src/components/signup/PhoneNumberForm';
import { UserForm } from '@/src/components/signup/UserForm';

const Signup = () => {
  const [code, setCode] = useState('');
  const [step, setStep] = useState(0);

  const onSuccess = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep(0);
  };

  return (
    <div className='p-4 bg-gradient min-h-full text-white flex flex-cols'>
      <Head>
        <title>AI Cake Generator</title>
      </Head>
      {step === 0 ? (
        <PhoneForm onSuccess={onSuccess} code={code} setCode={setCode} />
      ) : step === 1 ? (
        <VerifyCode
          onSuccess={onSuccess}
          phoneNumber={code}
          handleBack={handleBack}
        />
      ) : (
        <UserForm phoneNumber={code} />
      )}
    </div>
  );
};

export default Signup;
