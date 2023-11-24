import { useQuery } from 'react-query';
import Api from '../api';
import { QUERY_KEYS } from './const';

export const useGenerateVerifyUserCode = ({
  email,
  enabled,
  onError,
  phoneNumber,
  lang,
  onSuccess,
}: {
  email?: string;
  enabled: boolean;
  phoneNumber?: string;
  lang?: string;
  onError?: (error: any) => void;
  onSuccess?: () => void;
}) => {
  const { data, isLoading, isSuccess, isError, error } = useQuery(
    [QUERY_KEYS.GENERATE_VERIFY_USER_CODE],
    () => Api.generateVerifyUserCode(email, phoneNumber, lang),
    {
      enabled,
      cacheTime: 1000000,
      retry: false,
      onError,
      onSuccess,
    }
  );
  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
