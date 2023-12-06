import { useAppDispatch, useAppSelector } from '@/src/redux/store';
import Helpers from 'foodbit-helpers';
import dayjs from 'dayjs';
import { useState } from 'react';
import { classNames } from '@/src/utils/helpers';
import { useForm } from 'react-hook-form';
import { setDeliveryAddress, setOrderType } from '@/src/redux/slice/StoreSlice';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { setAlert } from '@/src/redux/slice/AlertSlice';
import { useCreateOrder } from '@/src/hooks/useCreateOrder';
import { useDialog } from '@/src/hooks/useDialog';
import BottomSheet from '../common/BottomSheet';
import type { Vendor as VendorType } from '@/src/types/helpers';
import { Loader } from '../common/Loader';
import { Stripe } from '../payments/Stripe';

export const VendorDetails = ({
  vendor,
  imageUrl,
}: {
  vendor: VendorType;
  imageUrl: any;
}) => {
  const { primaryLanguage, deliveryAddress, orderType, user } = useAppSelector(
    (state) => state.storeSlice
  );

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      deliveryAddress,
    },
  });

  const { mutation } = useCreateOrder();

  const { openDialog, handleClose, handleOpen } = useDialog();

  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<Date>();

  const onSubmit = (data: any) => {
    dispatch(setDeliveryAddress(data.deliveryAddress));
    localStorage.setItem('deliveryAddress', data.deliveryAddress);
    handleClose();
  };

  const handleOrderType = (orderType: string) => {
    dispatch(setOrderType(orderType));
    localStorage.setItem('orderType', orderType);
  };

  const onSubmit2 = () => {
    if (!selected) {
      dispatch(
        setAlert({
          color: 'error',
          message: 'Please select a delivery Date',
        })
      );
    } else {
      setOpen(false);
    }
  };

  const { labelOrDefault } = Helpers.StringsHelper;

  const handlePlaceOrder = (id: string) => {
    const payload = {
      paymentTransaction: {
        method: 'ONLINE',
        customerId: user?.id,
        id,
      },
      items: [
        {
          imageUrl,
        },
      ],
      merchantId: vendor.id,
      store: { id: vendor.mainStoreId },
      pickup: { type: 'IN_STORE' },
      type: 'PICKUP',
      delivery: deliveryAddress
        ? {
            location: {
              display: deliveryAddress,
            },
          }
        : undefined,
      customer: { id: user?.id },
    };

    mutation.mutate(payload);
  };

  return (
    <div>
      {mutation.isLoading ? <Loader /> : null}
      <BottomSheet
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <BottomSheet.Content height='h-auto'>
          <div className='px-5 py-5'>
            <div
              className={classNames(
                'rounded-xl ',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-500 focus:outline-none focus:ring-2'
              )}
            >
              <DayPicker
                classNames={{
                  day_selected: '!bg-indigo-500',
                  months: 'w-full',
                  ...classNames,
                }}
                mode='single'
                selected={selected}
                onSelect={(date) => {
                  setSelected(date);
                }}
              />

              <div>
                <button
                  type='button'
                  onClick={onSubmit2}
                  className='mt-7 relative flex items-center justify-center w-full py-2.5 bg-button rounded-md text-white text-2xl font-medium'
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </BottomSheet.Content>
      </BottomSheet>
      <BottomSheet open={openDialog} onClose={handleClose}>
        <BottomSheet.Content height='h-auto'>
          <form onSubmit={handleSubmit(onSubmit)} className='px-5 py-5'>
            <div
              className={classNames(
                'rounded-xl ',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-500 focus:outline-none focus:ring-2'
              )}
            >
              <div className='font-semibold text-white'>
                Please Add Your Delivery Address *
              </div>
              <textarea
                rows={5}
                {...register('deliveryAddress', {
                  required: true,
                })}
                aria-invalid={errors.deliveryAddress ? 'true' : 'false'}
                required={!!errors.deliveryAddress}
                className={classNames(
                  'mt-4 placeholder:leading-5 text-white placeholder:text-sm  bg-gray-50/20 resize-none rounded-md w-full border-0 invalid:ring-2 invalid:ring-red-500 focus:invalid:ring-red-500 hover:ring-indigo-500 focus:ring-2 focus:ring-inset  ring-0'
                )}
              />
              <div>
                <button className='mt-7 relative flex items-center justify-center w-full py-2.5 bg-button rounded-md text-white text-2xl font-medium'>
                  Save
                </button>
              </div>
            </div>
          </form>
        </BottomSheet.Content>
      </BottomSheet>
      <div className='md:flex md:items-center md:justify-between md:space-x-5 space-y-6'>
        <div className='flex items-start space-x-5'>
          <div className='flex items-center justify-center w-12 h-12 rounded-full bg-pink-400'>
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
          <div>
            <h1 className='text-xl font-bold text-white'>
              {labelOrDefault(vendor.businessName, primaryLanguage)}
            </h1>
            <p className='text-sm font-medium text-gray-400 flex'>
              {labelOrDefault(vendor.about, primaryLanguage)}
            </p>
          </div>
        </div>
        <div>
          <div className='p-3 bg-gray-200/10 rounded-md'>
            <div className='flex justify-between items-baseline'>
              <div className='text-sm font-medium text-white '>
                How would you like it
              </div>
              <div
                className='flex space-x-1 rounded-lg bg-gray-200/10 p-0.5'
                role='tablist'
                aria-orientation='horizontal'
              >
                <button
                  className={classNames(
                    'flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3  shadow',
                    orderType === 'PICKUP' ? 'bg-button' : ''
                  )}
                  onClick={() => handleOrderType('PICKUP')}
                  id='headlessui-tabs-tab-2'
                  role='tab'
                  type='button'
                  aria-selected='true'
                  tabIndex={0}
                  data-headlessui-state='selected'
                  aria-controls='headlessui-tabs-panel-4'
                >
                  <span
                    className={classNames(
                      orderType === 'PICKUP' ? 'text-white' : 'text-slate-300'
                    )}
                  >
                    Pickup
                  </span>
                </button>
                <button
                  onClick={() => handleOrderType('DELIVERY')}
                  className={classNames(
                    'flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3  shadow',
                    orderType === 'DELIVERY' ? 'bg-button' : ''
                  )}
                  id='headlessui-tabs-tab-3'
                  role='tab'
                  type='button'
                  aria-selected='false'
                  tabIndex={-1}
                  data-headlessui-state=''
                  aria-controls='headlessui-tabs-panel-5'
                >
                  <span
                    className={classNames(
                      orderType === 'DELIVERY' ? 'text-white' : 'text-slate-300'
                    )}
                  >
                    Delivery
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='p-3 bg-gray-200/10 rounded-md'>
            <div className='flex justify-between items-baseline'>
              <div className='text-sm font-medium text-white '>
                {' '}
                When do you want it?
              </div>

              <button
                onClick={() => setOpen(true)}
                type='button'
                className='text-sm text-purple-500 font-medium'
              >
                {selected ? 'Change' : 'Add'}
              </button>
            </div>
            <div className='mt-1 text-sm whitespace-pre-wrap text-gray-500'>
              {dayjs(selected).format('DD, MMM YY')}{' '}
            </div>
          </div>
        </div>
        <div>
          <div className='p-3 bg-gray-200/10 shadow rounded-md flex flex-col'>
            <div className='flex justify-between items-baseline'>
              <div className='font-medium text-sm'>
                {orderType === 'PICKUP'
                  ? 'Pickup Cake From'
                  : 'Delivery Address'}
              </div>
              {orderType === 'DELIVERY' ? (
                <button
                  onClick={handleOpen}
                  type='button'
                  className='text-sm text-purple-500 font-medium'
                >
                  {deliveryAddress ? 'Change' : '+ Add'}
                </button>
              ) : null}
            </div>
            {orderType === 'PICKUP' ? (
              <div className='mt-1 text-sm text-gray-500'>
                {labelOrDefault(vendor.businessName, primaryLanguage)}
              </div>
            ) : (
              <div className='mt-1 text-sm whitespace-pre-wrap text-gray-500'>
                {deliveryAddress ?? 'Add a delivery address to place an order'}
              </div>
            )}
          </div>
        </div>

        <Stripe onPaymentComplete={handlePlaceOrder} />
      </div>
    </div>
  );
};
