import Head from 'next/head';
import { DesignerForm } from '@/src/components/designerform/Form';

const Main = () => {
  return (
    <div
      className='px-4 py-5 flex flex-col relative bg-gradient min-h-full'
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
