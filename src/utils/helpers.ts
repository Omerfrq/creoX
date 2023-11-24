import { PaymentMethod } from '../types/helpers';

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const getCurrencyPlacement = (currency: string): boolean => {
  const currencySymbols =
    /[$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/;
  return currencySymbols.test(currency);
};

export const getPaymentMethodImage = (methodType: Partial<PaymentMethod>) => {
  const images = {
    VISA: '/visa.svg',
    MADA: '/mada.svg',
    MASTERCARD: '/mastercard.svg',
    AMERICAN_EXPRESS: '/amex.svg',
  };
  return images[methodType as keyof typeof images];
};
