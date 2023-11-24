import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import Api from '../api';
import { setAlert } from '../redux/slice/AlertSlice';

export const useCreateOrder = () => {
  const dispatch = useDispatch();

  const mutation = useMutation(Api.createOrder, {
    onSuccess: async (data) => {},
    onError: (error: { error_description: string }) => {
      if (error) {
        dispatch(
          setAlert({
            type: 'error',
            message: error?.error_description,
          })
        );
      }
    },
  });

  return { mutation };
};
