import React from 'react';

export const Loader = () => {
  return (
    <div className='fixed pointer-events-none top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50'>
      <div className='loader ease-linear border-t-4 border-blue-500 border-solid rounded-full animate-spin w-12 h-12'></div>
    </div>
  );
};
