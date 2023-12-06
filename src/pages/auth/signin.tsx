import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { Sigmar_One } from 'next/font/google';

const sigmar = Sigmar_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-sigmar',
});

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className=' flex flex-col bg-gradient min-h-full text-white'>
      <div
        className='h-56 w-full flex items-center justify-center bg-primary 
            rounded-bl-full rounded-br-full '
      >
        <img className='h-44 w-44' src='/eye.svg' alt='' />
      </div>

      <div className='bg-primary rounded-full -mt-24'></div>
      {Object.values(providers).map((provider) => (
        <div
          className='flex-1 px-10 flex-col flex space-y-6 justify-center h-full'
          onClick={() => signIn(provider.id)}
          key={provider.name}
        >
          <div
            className={`${sigmar.variable} text-4xl font-sigmarOne font-semibold`}
          >
            Sign in
          </div>
          <button className='px-4 flex items-center justify-center w-full py-3  bg-gray-50/10 gap-2  rounded-full'>
            <img
              className='w-6 h-6 mr-2'
              src='https://www.svgrepo.com/show/475656/google-color.svg'
              loading='lazy'
              alt='google logo'
            />
            <span>Sign in with {provider.name}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
