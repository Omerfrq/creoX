import React from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { classNames } from '@/src/utils/helpers';

export const StripeElement = ({
  onPaymentComplete,
}: {
  onPaymentComplete: (id: string) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000',
        receipt_email: 'omerfrq7@gmail.com',
      },
      redirect: 'if_required',
    });

    if (response.paymentIntent?.status === 'succeeded') {
      onPaymentComplete(response.paymentIntent.id);
    } else if (
      response?.error?.type === 'card_error' ||
      response?.error?.type === 'validation_error'
    ) {
      setMessage(response?.error?.message);
      setIsLoading(false);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'accordion',
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <PaymentElement id='payment-element' options={paymentElementOptions} />
      <button
        className={classNames(
          'w-full px-12 py-4 rounded-md mt-8 font-semibold',
          true ? 'btn-bg-gradient ' : 'bg-gray-600/90 text-white bg-opacity-95 '
        )}
        disabled={isLoading || !stripe || !elements}
        id='submit'
      >
        <span id='button-text'>
          {isLoading ? <div className='spinner' id='spinner'></div> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id='payment-message'>{message}</div>}
    </form>
  );
};
