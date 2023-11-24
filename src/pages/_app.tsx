import { AppProps } from 'next/app';
import '../styles/globals.css';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import StoreProvider from '../providers/StoreProvider';
import { Open_Sans } from 'next/font/google';
import Script from 'next/script';
import { AppStatus } from '../components/appstatus/AppStatus';
import { Alert } from '../components/common/Alert';

const inter = Open_Sans({
  subsets: ['cyrillic'],
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
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <main className={`${inter.variable} h-full font-sans`}>
            <AppStatus />
            <Alert />
            <Component {...pageProps} />
            <Script
              src='https://secure.gosell.io/js/sdk/tap.min.js'
              strategy='afterInteractive'
            />
          </main>
        </Hydrate>
      </QueryClientProvider>
    </StoreProvider>
  );
}
