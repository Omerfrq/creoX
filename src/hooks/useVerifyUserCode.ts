import { useMutation } from 'react-query';

import Api from '../api/';

export const useVerifyUserCode = () => {
  const mutation = useMutation(Api.verifyUserCode, {
    onSuccess: () => {},
  });

  return { mutation };
};
