import { LottieLoader } from '../common/LottieLoader';

export const ComingSoon = () => {
  return (
    <div className='text-center flex-col h-[350px] flex items-center justify-between'>
      <div className='w-full mt-10 rounded-md overflow-hidden'>
        <LottieLoader
          config={{
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid meet',
            },

            autoplay: true,
            loop: true,
            path: 'https://lottie.host/b99e09ba-5306-4e34-bf78-31f0c5a379a0/pSfCQ2vIqq.json',
          }}
        />
      </div>
      <div>
        <h3 className='text-base mt-4 font-semibold text-white'>Coming Soon</h3>
        <p className='mt-1 text-sm text-gray-500'>
          CreoX and friends are currently working hard building this feature!
        </p>
      </div>
    </div>
  );
};
