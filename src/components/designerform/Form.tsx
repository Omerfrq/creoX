import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAI } from '@/src/hooks/useAI';
import BottomSheet from '../common/BottomSheet';
import Output from './Output';
import { Sigmar_One } from 'next/font/google';
import { useGenerationDetails } from '@/src/hooks/useGenerationDetails';
import { BuyCredits } from '../common/BuyCredits';
import { Generations } from '../generation/ViewExamples';
import { ComingSoonForm } from '../presignupform/ComingSoonForm';
import { useAppSelector } from '@/src/redux/store';
import { WithContext as ReactTags } from 'react-tag-input';
import { PlusIcon } from '@heroicons/react/24/outline';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const sigmar = Sigmar_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-sigmar',
});

export const DesignerForm = () => {
  const { handleSubmit } = useForm<{ keyword: string; category: string }>({
    defaultValues: {
      category: 'TSHIRT',
      keyword: undefined,
    },
  });

  const { userId } = useAppSelector((state) => state.storeSlice);

  const [showForm, setShowForm] = useState(false);

  const [credits, setCredits] = useState('1');
  const [error, setError] = useState(false);
  const [id, setId] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [openComingSoon, setOpenComingSoon] = useState(false);
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<any>([]);

  const { mutation } = useAI();

  const { loading, data, setLoading, isError } = useGenerationDetails({
    id,
    enabled,
  });

  useEffect(() => {
    const currentCredits = localStorage.getItem('credits');

    if (credits) {
      setCredits(currentCredits ?? '1');
    }
  }, [credits]);

  const handleDelete = (i: number) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  const handleAddition = (tag: { id: string; text: string }) => {
    setTags([...tags, tag]);
  };

  const onCloseBottomSheet = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    if (credits === '0') {
      setOpenComingSoon(true);
    } else {
      setLoading(true);
      localStorage.setItem('credits', '0');
      setCredits('0');

      const sentPayload = {
        keywords: tags.map((t) => t.text),
        category: 'TSHIRT',
        style: 'vivid',
        userId,
      };

      setOpen(true);

      mutation.mutateAsync(sentPayload, {
        onSuccess: (data) => {
          setTags([]);
          if (data?.status !== 'error' || data.error) {
            setId(data.id);
            setEnabled(true);
          } else {
            setLoading(false);
            setEnabled(false);
            setError(true);
          }
        },
      });
    }
  };

  return (
    <>
      <BottomSheet
        open={openComingSoon}
        onClose={() => setOpenComingSoon(false)}
      >
        <BottomSheet.Content height='auto'>
          <ComingSoonForm type='credit' />
        </BottomSheet.Content>
      </BottomSheet>

      <BottomSheet open={open} onClose={onCloseBottomSheet}>
        <BottomSheet.Content>
          {error || isError ? (
            <BuyCredits onClose={onCloseBottomSheet} />
          ) : (
            <Output
              details={data}
              isLoading={loading || mutation.isLoading}
              onClose={onCloseBottomSheet}
              onRefresh={handleSubmit(onSubmit)}
            />
          )}
        </BottomSheet.Content>
      </BottomSheet>
      <div className='flex-1'>
        <div
          className={`${
            credits === '0' ? 'pointer-events-none opacity-40' : ''
          }`}
        >
          <div className='flex mt-5 items-center justify-between'>
            <div className={`${sigmar.variable}  text-white font-sigmarOne`}>
              {`Let's Begin`}
            </div>
          </div>

          <div className='font-normal mt-3 text-sm text-white'>
            Enter 3-6 keywords for things you like (i.e. Viking, Lakers)
          </div>

          <div className='space-y-4 mt-4'>
            {!showForm ? (
              <button
                type='button'
                onClick={() => {
                  setShowForm(true);
                }}
                className='rounded-full w-full
items-center space-x-3 flex justify-center px-2 py-3.5 text-primary border border-primary shadow-sm'
              >
                <PlusIcon className='h-5 w-5' aria-hidden='true' />
                <span className='text-sm'>Keyword</span>{' '}
              </button>
            ) : (
              <ReactTags
                tags={tags}
                allowDragDrop={false}
                delimiters={delimiters}
                placeholder={
                  tags.length === 6
                    ? 'You have entered 6 Keywords'
                    : '+ Enter To Add'
                }
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                inputFieldPosition='bottom'
                inputProps={{
                  disabled: tags.length === 6,
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className='w-full text-center'>
        <Generations />
        <button
          onClick={onSubmit}
          disabled={
            credits === '0' ? false : tags.length < 3 || tags.length > 6
          }
          className='flex items-center disabled:bg-gray-200/20 justify-center w-full py-3.5 bg-primary rounded-full text-black text-sm font-normal'
        >
          {credits === '0' ? 'Get Credits' : 'Get Weird'}
        </button>
      </div>
    </>
  );
};
