import { Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useAppDispatch, useAppSelector } from '@/src/redux/store';
import { handleCloseAlert } from '@/src/redux/slice/AlertSlice';
import { AlertType } from '@/src/types/helpers';

const AlertTypeIcon = ({ type }: { type: AlertType }) => {
  switch (type) {
    case 'success':
      return <CheckCircleIcon className='h-6 w-6 text-green-400' />;
    case 'error':
      return <XCircleIcon className='h-5 w-5 text-red-400' />;
    default:
      return <XMarkIcon />;
  }
};

export const Alert = () => {
  const { showAlert, type, message, description, autoHide } = useAppSelector(
    (state) => state.alertSlice
  );

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(handleCloseAlert());
  };

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        dispatch(handleCloseAlert());
      }, autoHide);
    }
  }, [dispatch, showAlert, autoHide]);

  return (
    <div
      aria-live='assertive'
      className='fixed inset-0 z-[4000000000000] flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start'
    >
      <div className='w-full flex flex-col items-center space-y-4 sm:items-end'>
        <Transition
          show={showAlert}
          as={Fragment}
          enter='transform ease-out duration-500 transition'
          enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
          enterTo='translate-y-0 opacity-100 sm:translate-x-0'
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden'>
            <div className='p-4'>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  {AlertTypeIcon({ type: type })}
                </div>
                <div className='ml-3 w-0 flex-1 '>
                  <p className='text-sm font-medium capitalize text-gray-900'>
                    {message}
                  </p>
                  {description ? (
                    <p className='mt-1 text-sm text-gray-500'>{description}</p>
                  ) : null}
                </div>
                <div className='ml-4 flex-shrink-0 flex'>
                  <button
                    type='button'
                    className='bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    onClick={handleClose}
                  >
                    <span className='sr-only'>Close</span>
                    <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};
