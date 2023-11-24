import { useQuery } from 'react-query';
import Api from '../api';
import { QUERY_KEYS } from './const';

export const useGenerationHistory = ({ userId }: { userId?: string }) => {
  const { data, isLoading, error } = useQuery(
    [QUERY_KEYS.FETCH_GENERATION_HISTORY, userId],
    () => Api.getHistory(userId),
    {
      enabled: !!userId,
    }
  );

  return {
    history: data?.history,
    isLoading,
    error,
  };
};
