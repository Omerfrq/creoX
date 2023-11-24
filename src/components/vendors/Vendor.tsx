import { RootState, useAppSelector } from '@/src/redux/store';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import React from 'react';
import Helpers from 'foodbit-helpers';
import { VendorDetails } from './VendorDetails';
import type { CakeAIData, Vendor as VendorType } from '@/src/types/helpers';
import BottomSheet from '../common/BottomSheet';
import { DisplayCurrency } from '../common/DisplayCurrency';

export const Vendor = ({
  vendor,
  payload,
  imageUrl,
}: {
  vendor: VendorType;
  payload?: CakeAIData | null;
  imageUrl: string;
}) => {
  const { primaryLanguage } = useAppSelector(
    (state: RootState) => state.storeSlice
  );

  const { labelOrDefault } = Helpers.StringsHelper;
  const designComplexity = Object.values(
    vendor.designComplexity?.[payload?.design ?? 0] ?? {}
  )[0];

  const { minPrice, maxPrice } = designComplexity ?? {};

  return (
    <BottomSheet.NestedSheet key={vendor.id}>
      <BottomSheet.Button asChild>
        <div className='flex py-4 items-center space-x-3'>
          <div className='flex items-center justify-center w-8 h-8 rounded-full bg-pink-400'>
            {vendor.businessLogo ? (
              <img
                src={vendor.businessLogo}
                alt={labelOrDefault(vendor.businessName, primaryLanguage)}
                className='w-full h-full rounded-full object-cover'
              />
            ) : (
              <span className='text-sm font-medium'>
                {labelOrDefault(vendor.businessName, primaryLanguage)
                  .match(/\b[a-zA-Z]/g)
                  ?.slice(0, 2)
                  .join('') || ''}
              </span>
            )}
          </div>
          <div className='flex-1'>
            <div className='flex space-x-3 items-center'>
              <p className='text-xs font-semibold text-white'>
                {labelOrDefault(vendor.businessName, primaryLanguage)}
              </p>
            </div>
          </div>
          <div className='flex items-center'>
            {typeof minPrice === 'number' && typeof maxPrice === 'number' && (
              <span className='text-xs text-white font-semibold px-1 rounded-full'>
                <DisplayCurrency text={designComplexity.minPrice ?? ''} />{' '}
                {' - '}
                <DisplayCurrency text={designComplexity.maxPrice ?? ''} />
              </span>
            )}
            <ChevronRightIcon strokeWidth={3} className='w-4 h-4' />
          </div>
        </div>
      </BottomSheet.Button>
      <BottomSheet.Content>
        <div className=' px-4 pt-2 pb-4 '>
          <VendorDetails vendor={vendor} imageUrl={imageUrl} />
        </div>
      </BottomSheet.Content>
    </BottomSheet.NestedSheet>
  );
};
