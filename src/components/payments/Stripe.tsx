import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElement } from './StripeElement';

const stripePromise = loadStripe('pk_test_ZlweN3nPeZpk6GMsvEdprEJd00ao6w8ieU');

export const Stripe = ({
  onPaymentComplete,
}: {
  onPaymentComplete: (id: string) => void;
}) => {
  const [clientSecret, setClientSecret] = React.useState('');

  React.useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#a781dc',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='App'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeElement onPaymentComplete={onPaymentComplete} />
        </Elements>
      )}
    </div>
  );
};
