import { AppProps } from 'next/app';
import '../styles/globals.css';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import StoreProvider from '../providers/StoreProvider';
import { Lato } from 'next/font/google';
import { AppStatus } from '../components/appstatus/AppStatus';
import { Alert } from '../components/common/Alert';
import { CartProvider } from 'react-use-cart';
// import { Cart } from '../components/cart';

const inter = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-inter',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <CartProvider>
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <main className={`${inter.variable} h-full font-sans`}>
              <AppStatus />
              <Alert />
              {/* <Cart /> */}
              <Component {...pageProps} />
            </main>
          </Hydrate>
        </QueryClientProvider>
      </StoreProvider>
    </CartProvider>
  );
}
