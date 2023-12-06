import { useMutation } from 'react-query';
import Api from '../api';

export const usePreSignup = () => {
  const mutation = useMutation(Api.preSignup);

  return { mutation };
};
