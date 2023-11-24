import { useCreatePaymentMutation } from '@/src/hooks/useCreatePaymentsMutation';
import { setAlert } from '@/src/redux/slice/AlertSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/store';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export const TapElementsForm = () => {
  const { mutation } = useCreatePaymentMutation();

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [uiLoaded, setUILoaded] = useState(false);

  const ref = useRef(0);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.storeSlice);

  useEffect(() => {
    const redirectUrl = `${window.origin}${router.asPath}`;
    const initializeTap = () => {
      const tap = Tapjsli('pk_test_tpK6E39cINvR4WJ1Yx85LFPy');

      const style = {
        base: {
          background: 'transparent',
          color: '#535353',
          lineHeight: '18px',
          fontFamily: 'inherit',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: 'rgba(0, 0, 0, 0.26)',
            fontSize: '15px',
          },
        },
        invalid: {
          color: 'red',
        },
      };

      const labels = {
        cardNumber: 'Card Number',
        expirationDate: 'MM/YY',
        cvv: 'CVV',
      };

      const paymentOptions = {
        currencyCode: ['KWD', 'USD', 'SAR'],
        labels: labels,
        TextDirection: 'ltr',
        supportedPaymentMethods: 'all',
      };

      const elements = tap.elements(paymentOptions);
      const card = elements.create('card', { style: style }, paymentOptions);

      card.mount('#element-container');

      card.addEventListener('change', (event) => {
        if (event.loaded) {
          setUILoaded(true);
        }

        if (event?.error) {
          dispatch(
            setAlert({
              type: 'error',
              message: event?.error?.message ?? '',
            })
          );
        }
      });

      const form = document.getElementById('form-container');
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
          const result = await tap.createToken(card);

          if (result.error) {
            dispatch(
              setAlert({
                type: 'error',
                message: result?.error?.message,
              })
            );
          } else {
            mutation.mutateAsync(
              {
                customerId: '082d7954-5a47-490e-a193-190f9bfd4054' ?? user?.id,
                tokenId: result.id,
                provider: 'TAP',
                amount: 1,
                redirectUrl,
              },
              {
                onSuccess: (data) => {
                  setLoading(false);
                  window.open(data.redirectUrl);
                  // dispatch(setCardId(result.card.id));
                  // localStorage.setItem('fb-card-info', result.card.id);
                  // onClose();
                },
                onError: () => {
                  setLoading(false);
                  dispatch(
                    setAlert({
                      type: 'error',
                      message: 'Unable To Add Card',
                    })
                  );
                },
              }
            );
          }
        } catch (error) {
          dispatch(
            setAlert({
              type: 'error',
              message: 'An error occurred. Please try again.',
            })
          );
        }
      });
    };
    if (ref.current === 0) {
      initializeTap();
      ref.current++;
    }
  }, [dispatch, user?.id, mutation, router.asPath]);

  return (
    <div className='p-4'>
      <form id='form-container'>
        <div id='element-container' className='mb-4' />

        <button
          className='mt-7 relative flex items-center justify-center w-full py-2.5 bg-button rounded-md text-white text-xl font-medium'
          disabled={loading || !uiLoaded}
          type='submit'
        >
          {loading && 'loading'}
          Add Card
        </button>
      </form>
    </div>
  );
};
