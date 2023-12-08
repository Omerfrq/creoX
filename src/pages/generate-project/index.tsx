import Head from 'next/head';
import { DesignerForm } from '@/src/components/designerform/Form';
import { useEffect } from 'react';
import Helpers from 'foodbit-helpers';
import { useAppDispatch } from '@/src/redux/store';
import { setUserId } from '@/src/redux/slice/StoreSlice';

const Main = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const { uuid } = Helpers.StringsHelper;
    const credits = localStorage.getItem('credits');
    const userId = localStorage.getItem('userId');

    if (!userId) {
      const id = uuid();
      localStorage.setItem('userId', id);
      dispatch(setUserId(id));
    } else {
      dispatch(setUserId(userId));
    }

    if (!credits) {
      localStorage.setItem('credits', '1');
    }
  }, [dispatch]);

  return (
    <div
      className='px-4 py-5 flex flex-col relative bg-gradient h-screen overflow-hidden'
      onTouchMove={() => document.activeElement?.blur?.()}
    >
      <Head>
        <title>AI Cake Generator</title>
      </Head>

      <DesignerForm />
    </div>
  );
};

export default Main;
