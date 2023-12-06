import { useQuery } from 'react-query';
import Api from '../api';
import { QUERY_KEYS } from './const';

export const useFetchExamples = () => {
  const { data, isLoading, error } = useQuery(
    [QUERY_KEYS.FETCH_EXAMPLES],
    Api.fetchExamples
  );

  return {
    examples: data,
    isLoading,
    error,
  };
};
