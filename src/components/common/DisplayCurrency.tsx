import React from 'react';

import { getCurrencyPlacement } from '@/src/utils/helpers';

import Helpers from 'foodbit-helpers';
import { Currency } from '@/src/types/helpers';

interface Props {
  currency?: Currency;
  text?: number | string;
}

/**
 * Component for displaying currency. (determines where to place currency symbol)
 * Component is extended from MUI <Typography/> (you can pass TypographyProps as well)
 *
 * @component
 * @example
 * const text: string = '21.5'
 * const currency: string = '$' || 'AED'
 * return (
 *   <DisplayCurrency text={text} currency={currency} />
 * )
 */

export const DisplayCurrency = ({ currency, text }: Props) => {
  const validatedCurrency = currency?.value ?? 'SAR';
  const isCurrencyPrefix = currency && getCurrencyPlacement(validatedCurrency);
  const formattedText =
    typeof text === 'number'
      ? (text && Helpers.StringsHelper.numberWithCommas(text)) || 0
      : text;

  return (
    <>
      {isCurrencyPrefix
        ? `${validatedCurrency}${formattedText}`
        : `${formattedText} ${validatedCurrency}`}
    </>
  );
};
