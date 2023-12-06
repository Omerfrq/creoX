import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export const CartEmptyState = () => {
  return (
    <div className='flex-col flex justify-center items-center py-20'>
      <span>
        <ShoppingCartIcon className='h-40 text-gray-300' />
      </span>
      <span className='my-4 dark:text-white'>
        You cart is currently empty...
      </span>
    </div>
  );
};
