import Head from 'next/head';
import { HistoryList } from '@/src/components/history/HistoryList';
import { DesignerForm } from '@/src/components/designerform/Form';

const Main = () => {
  return (
    <div
      className='px-6 py-5 bg-gradient min-h-full'
      onTouchMove={() => document.activeElement?.blur?.()}
    >
      <Head>
        <title>AI Cake Generator</title>
      </Head>
      <div className='flex justify-between items-center  mb-8'>
        <div className='group block flex-shrink-0'>
          <div className='flex items-center'>
            <div>
              <img
                className='inline-block h-7 w-auto'
                src='https://creox.ai/wp-content/uploads/2023/05/WhatsApp_Image_2023-10-31_at_21.04.49_7b71d72c-removebg-preview.png'
                alt=''
              />
            </div>
          </div>
        </div>

        <HistoryList />
      </div>
      <DesignerForm />
    </div>
  );
};

export default Main;
