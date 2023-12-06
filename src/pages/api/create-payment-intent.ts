const stripe = require('stripe')('sk_test_11xUWqw1bPOdZI8Qx0T4vro60057pAxcM9');

export default async function handler(req, res) {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1400,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
