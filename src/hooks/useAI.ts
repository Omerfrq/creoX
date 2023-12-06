import { useMutation } from 'react-query';
import Api from '../api';

export const useAI = () => {
  const mutation = useMutation(Api.generationImage);

  return { mutation };
};
