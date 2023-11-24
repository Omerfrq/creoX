import { useMutation, useQueryClient } from 'react-query';
// import { useDispatch } from 'react-redux';
import Api from '../api';
import { QUERY_KEYS } from './const';

export const useCreatePaymentMutation = () => {
  //   const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation(Api.createPaymentMethod, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.FETCH_PAYMENT_CARDS]);
      //   localStorage.setItem('show-feedback', 'true');
      //   dispatch(setShowFeedback(true));
    },
    // onError: (error: { error_description: string }) => {
    //     if (error) {
    //       dispatch(
    //         setAlert({
    //           color: 'error',
    //           message: error?.error_description,
    //         }),
    //       );
    //     }
    // },
  });

  return { mutation };
};
