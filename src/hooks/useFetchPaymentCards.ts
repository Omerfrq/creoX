import { useQuery } from 'react-query';
import Api from '../api/';
import { QUERY_KEYS } from './const';

export const useFetchPaymentCards = ({
  customerId,
}: {
  customerId: string;
}) => {
  const { data, isLoading, error } = useQuery(
    [QUERY_KEYS.FETCH_PAYMENT_CARDS, customerId],
    () => Api.fetchPaymentMethods(customerId),
    { enabled: !!customerId }
  );

  return {
    cards: data,
    isLoading,
    error,
  };
};
