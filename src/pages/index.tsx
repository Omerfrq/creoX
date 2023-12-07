import Head from 'next/head';
import Link from 'next/link';
import { Sigmar_One } from 'next/font/google';
import { Lottie } from '@crello/react-lottie';

const sigmar = Sigmar_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-sigmar',
});

const Home = () => {
  return (
    <div className='p-4 bg-gradient flex flex-col justify-between h-screen overflow-hidden text-white'>
      <Head>
        <title>Weirdness</title>
      </Head>

      <div>
        <div>
          <div className='relative w-full h-[45vh] mt-4'>
            <Lottie
              config={{
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid meet',
                },
                path: '/weird_welcome.json',
                autoplay: true,
                loop: true,
              }}
            />
          </div>

          <h1
            className={`${sigmar.variable} text-center text-5xl mt-2 font-sigmarOne font-semibold leading-[60px]`}
          >
            Welcome to Weirdness
          </h1>

          <p className='text-center mt-3 text-base text-[#aaa]'>
            Visualize your weird obsessions and memorize them forever on a
            t-shirt, mug, towel...whatever
          </p>
        </div>
      </div>
      <div className='w-full mb-4'>
        <Link
          className='px-8 py-4 w-full flex justify-center items-center  capitalize text-black bg-primary rounded-full font-normal'
          href='/generate-project'
        >
          Let the weirdness Begin
        </Link>
      </div>
    </div>
  );
};

export default Home;
