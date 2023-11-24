import { useMutation } from 'react-query';

import Api from '../api/';

export const useCreateUser = () => {
  const mutation = useMutation(Api.createUser);

  return { mutation };
};
