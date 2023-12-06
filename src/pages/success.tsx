import React from 'react';
import Head from 'next/head';
import { Sigmar_One } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const sigmar = Sigmar_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-sigmar',
});

const Success = () => {
  return (
    <div className='p-4 bg-gradient h-screen text-white'>
      <Head>
        <title>Sucess</title>
      </Head>

      <div className='flex flex-col h-full justify-between'>
        <div>
          <div className='relative h-[36vh] w-full mt-12'>
            <Image src={'/hurray.svg'} alt='cake' layout='fill' priority />
          </div>

          <h1
            className={`${sigmar.variable} text-center text-5xl font-sigmarOne font-semibold leading-[60px]`}
          >
            Welcome to Weirdness
          </h1>

          <p className='text-center mt-8 text-base text-[#aaa]'>
            Visualize your weird obsessions and memorize them forever on a
            t-shirt, mug, towel...whatever
          </p>
        </div>
        <div className='w-full my-6'>
          <Link
            className='px-8 py-4 w-full flex justify-center items-center  capitalize text-black bg-primary rounded-full font-normal'
            href='/generate-project'
          >
            Sounds Good
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Success;
