import { classNames } from '@/src/utils/helpers';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Open_Sans } from 'next/font/google';
import { Drawer } from 'vaul';

interface IFBBottomSheet {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
}

const inter = Open_Sans({
  subsets: ['cyrillic'],
  variable: '--font-inter',
});

export default function BottomSheet({
  children,
  open,
  onClose,
}: IFBBottomSheet) {
  return (
    <Drawer.Root open={open} onOpenChange={onClose}>
      {children}
    </Drawer.Root>
  );
}

const BottomSheetContent = ({
  children,
  title,
  onClose,
  height = 'h-full',
}: {
  children: React.ReactNode;
  title?: string;
  onClose?: () => void;
  height?: string;
}) => {
  return (
    <Drawer.Portal>
      <Drawer.Overlay className='fixed inset-0 bg-black/40' />
      <Drawer.Content
        className={classNames(
          'font-sans rounded-md flex flex-col z-[10000000] fixed bottom-0 left-0 right-0',
          height,
          inter.variable
        )}
      >
        <div
          className={classNames(
            ' bg-gradient shadow-sm rounded-xl text-white flex-1 overflow-auto'
          )}
        >
          <div className='pt-2 relative'>
            <div className='mx-auto w-10 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-3' />
            {title ? (
              <div className='border-0 pb-3 font-medium text-center border-primary border-b border-solid'>
                {title}
              </div>
            ) : null}
            {onClose && (
              <button type='button' onClick={onClose}>
                <XMarkIcon
                  className='w-5 h-5 absolute right-4 bottom-10'
                  strokeWidth={2}
                />
              </button>
            )}
          </div>

          <div>{children}</div>
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  );
};

const NestedBottomSheet = ({ children }: { children: React.ReactNode }) => {
  return <Drawer.NestedRoot>{children}</Drawer.NestedRoot>;
};

BottomSheet.Button = Drawer.Trigger;
BottomSheet.Content = BottomSheetContent;
BottomSheet.NestedSheet = NestedBottomSheet;
