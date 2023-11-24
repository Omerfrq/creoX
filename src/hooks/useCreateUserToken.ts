import { useMutation } from 'react-query';
import Api from '../api';

export const useCreateUserToken = () => {
  const mutation = useMutation(Api.createUserToken);

  return { mutation };
};
