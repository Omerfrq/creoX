import { Lottie, ReactLottieConfigWithPath } from '@crello/react-lottie';

export const LottieLoader = ({
  config,
  height,
}: {
  config: ReactLottieConfigWithPath;
  height?: string;
}) => {
  return <Lottie config={config} height={height} />;
};
