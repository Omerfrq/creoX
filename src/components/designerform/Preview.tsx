import React from 'react';
import BottomSheet from '../common/BottomSheet';
import { useDialog } from '@/src/hooks/useDialog';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { useCart } from 'react-use-cart';
import Image from 'next/image';
import { PresignForm } from '../presignupform/PresignupForm';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const memoryOptions = [
  { name: 'XXS', inStock: true },
  { name: 'XS', inStock: true },
  { name: 'S', inStock: true },
  { name: 'M', inStock: true },
  { name: 'L', inStock: true },
  { name: 'XL', inStock: true },
  { name: 'XXL', inStock: true },
];

const colors = [
  { name: 'Pink', bgColor: 'bg-pink-500', selectedColor: 'ring-pink-500' },
  {
    name: 'Purple',
    bgColor: 'bg-purple-500',
    selectedColor: 'ring-purple-500',
  },
  { name: 'Blue', bgColor: 'bg-blue-500', selectedColor: 'ring-blue-500' },
  { name: 'Green', bgColor: 'bg-green-500', selectedColor: 'ring-green-500' },
  {
    name: 'Yellow',
    bgColor: 'bg-yellow-500',
    selectedColor: 'ring-yellow-500',
  },
];

export const Preview = ({
  imageUrl,
  category,
}: {
  imageUrl: string;
  category: { name: string; type: string; image: string };
}) => {
  const { openDialog, handleClose, handleOpen } = useDialog();

  const [count, setCount] = useState(1);
  const [mem, setMem] = useState(memoryOptions[2]);
  const [selectedColor, setSelectedColor] = useState(colors[1]);

  const { addItem } = useCart();

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addToCart = () => {
    const payload = {
      id: '123',
      image: imageUrl,
      price: 10,
      color: selectedColor.name,
      size: mem.name,
    };

    addItem(payload, count);
  };

  return (
    <div>
      {/* <BottomSheet open={openDialog} onClose={handleClose}>
        <BottomSheet.Content>
          <div className='flex justify-between px-2'>
            <button className='rounded-full p-2 text-white shadow-sm hover:bg-gray-50/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 '>
              <ChevronLeftIcon className='h-6 w-6' />
            </button>
            <button className='rounded-full p-2 text-white shadow-sm hover:bg-gray-50/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'>
              <ShoppingBagIcon className='h-6 w-6' />
            </button>
          </div>
          <div>
            <div className='relative pt-6 flex items-center justify-center '>
              <div>
                <Image className='h-72 w-96' src='/t-shirt.png' alt='' />
                <Image
                  className='absolute rounded-md h-32 w-32'
                  src={imageUrl}
                  alt=''
                />
              </div>
            </div>
          </div>
          <div className='grid text-xs mt-4 gap-x-2 grid-cols-2 px-4'>
            <div className='bg-gray-50/10 p-4 items-center flex space-x-3 rounded-full'>
              <img src={'/mens-cut.svg'} alt='' />
              <div>Men's Cut</div>
            </div>
            <div className='bg-gray-50/10 p-4 items-center flex space-x-3 rounded-full'>
              <img src={'/womens-cut.svg'} alt='' />
              <div>Women's Cut</div>
            </div>
          </div>
          <div className='p-4'>
            <div className='mt-8'>
              <div>
                <div className='flex items-center justify-between'>
                  <h2 className='text-base font-medium leading-6 text-white'>
                    Colors
                  </h2>
                  <div className='text-sm font-normal leading-6 text-primary'>
                    Customize
                  </div>
                </div>
                <RadioGroup value={selectedColor} onChange={setSelectedColor}>
                  <div className='flex items-center pt-2 pb-4 space-x-3'>
                    {colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedColor,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as='span' className='sr-only'>
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden='true'
                          className={classNames(
                            color.bgColor,
                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div>
                <div className='flex items-center justify-between'>
                  <h2 className='text-base font-medium leading-6 text-white'>
                    Sizes
                  </h2>
                  <div className='text-sm font-normal leading-6 text-primary'>
                    Size Guide
                  </div>
                </div>

                <RadioGroup value={mem} onChange={setMem} className='mt-2'>
                  <RadioGroup.Label className='sr-only'>
                    Size Guide
                  </RadioGroup.Label>
                  <div className='grid grid-cols-6 gap-3 sm:grid-cols-6'>
                    {memoryOptions.map((option) => (
                      <RadioGroup.Option
                        key={option.name}
                        value={option}
                        className={({ checked }) =>
                          classNames(
                            option.inStock
                              ? 'cursor-pointer focus:outline-none'
                              : 'cursor-not-allowed opacity-25',

                            checked
                              ? 'bg-primary text-black '
                              : ' bg-gray-50/10 text-white hover:bg-gray-50',
                            'flex items-center justify-center rounded-md py-3 px-3 text-xs font-semibold uppercase sm:flex-1'
                          )
                        }
                        disabled={!option.inStock}
                      >
                        <RadioGroup.Label as='span'>
                          {option.name}
                        </RadioGroup.Label>
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          <div className='flex p-4 space-x-3'>
            <div className='flex space-x-2 items-center'>
              <button
                type='button'
                onClick={decrement}
                disabled={count === 1}
                className='cursor-pointer disabled:text-gray-500 disabled:bg-transparent disabled:border-gray-400 border border-primary flex items-center justify-center bg-primary text-black rounded-full h-6 w-6'
              >
                <MinusIcon strokeWidth={2.5} className='h-4 w-4' />
              </button>
              <span>{count}</span>
              <button
                type='button'
                onClick={increment}
                className='cursor-pointer flex items-center justify-center bg-primary text-black rounded-full h-6 w-6'
              >
                <PlusIcon strokeWidth={2.5} className='h-4 w-4' />
              </button>
            </div>
            <button
              onClick={addToCart}
              type='button'
              className='flex items-center disabled:bg-gray-200/20 justify-center w-full py-2.5 bg-primary rounded-full text-black text-sm font-medium'
            >
              Add To Cart
            </button>
          </div>
        </BottomSheet.Content>
      </BottomSheet> */}
      <BottomSheet open={openDialog} onClose={handleClose}>
        <BottomSheet.Content>
          <PresignForm category={category} imageUrl={imageUrl} />
        </BottomSheet.Content>
      </BottomSheet>

      <div
        onClick={handleOpen}
        className='flex relative p-2.5 items-center bg-gray-50/10 space-x-3 rounded-2xl'
      >
        <div className='flex items-center justify-center  rounded-md '>
          <div className='relative flex items-center justify-center '>
            <img className={'h-16 w-16'} src={category.image} alt='' />
            <img
              className={classNames(
                'absolute rounded-md h-6 w-6',
                category.type === 'mug' ? 'mr-2 mt-1' : '',
                category.type === 'bag' ? 'mt-5 mt-3' : ''
              )}
              src={
                'https://dev-medias-bucket-original.s3.amazonaws.com/share/b9e364ec-941a-4932-a017-c4c4756554ba.png' ??
                imageUrl
              }
              alt=''
            />
          </div>
        </div>
        <div className='flex-1'>
          <div className='flex space-x-3 items-center'>
            <p className='text-sm font-normal text-white'>{category.name}</p>
          </div>
        </div>
        <div className='flex items-center'>
          <ChevronRightIcon strokeWidth={3} className='w-4 h-4' />
        </div>
      </div>
    </div>
  );
};
