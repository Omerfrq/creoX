/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '../redux/store';

const Home = () => {
  const { user } = useAppSelector((state) => state.storeSlice);

  return (
    <div className='p-4 bg-gradient min-h-full text-white'>
      <Head>
        <title>AI Cake Generator</title>
      </Head>
      <div className='flex flex-col items-center justify-center'>
        <div className='relative h-[36vh] w-full mt-12'>
          <Image src={'/cake-welcome.svg'} alt='cake' layout='fill' priority />
        </div>
        <h1 className='text-4xl font-semibold'>Welcome to</h1>
        <img
          src='https://creox.ai/wp-content/uploads/2023/05/WhatsApp_Image_2023-10-31_at_21.04.49_7b71d72c-removebg-preview.png'
          alt='creox'
          className='w-32 block mt-6'
        />
        <p className='text-center mt-8 text-base text-[#aaa]'>
          Use simple text to generate your project using CreoX&lsquo;s
          AI-powered Autodesigner.
        </p>
        <Link
          className='px-8 py-4 btn-bg-gradient rounded-full mt-8 font-semibold'
          href={user ? '/generate-project' : '/signup'}
        >
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Home;
