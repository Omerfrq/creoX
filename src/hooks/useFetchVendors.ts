import { useQuery } from 'react-query';
import Api from '../api';

export const useFetchVendors = () => {
  return useQuery(['fetch-vendors'], Api.fetchVendors);
};
