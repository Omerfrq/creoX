import { useQuery } from 'react-query';
import Api from '../api';
import { useState } from 'react';
import { QUERY_KEYS } from './const';
import { useAppSelector } from '../redux/store';

export const useGenerationDetails = ({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) => {
  const { userId } = useAppSelector((state) => state.storeSlice);
  const [loading, setLoading] = useState(true);
  const { data, refetch, isError } = useQuery(
    [QUERY_KEYS.GENERATION_IMAGE_DETAILS, id],
    () => Api.generationImageDetails(id),
    {
      cacheTime: 0,
      retry: false,
      refetchInterval: (data) => {
        if (data) {
          if (data?.status === 'DONE') {
            setLoading(false);
            return false;
          } else if (
            data?.status === 'PROCESSING' ||
            (data?.status === 'FAILED' && data?.retry < 2)
          ) {
            setLoading(true);
            return 2000;
          } else {
            setLoading(true);
            return 2000;
          }
        } else {
          return false;
        }
      },
      onError: () => {
        setLoading(false);
      },
      enabled,
    }
  );

  return { data, loading, refetch, setLoading, isError };
};
