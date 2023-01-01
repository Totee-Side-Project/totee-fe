declare module 'react-quill';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Global } from '@emotion/react';
import { ThemeProvider } from '@emotion/react';

import globalStyle from '@styles/globalStyle';
import { theme } from '@styles/theme';
import ScrollToTop from '@components/atoms/ScrollToTop';
import App from './App';
import './index.css';

// default cacheTime은 5분
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      // cacheTime: 1000 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <Global styles={globalStyle} />
            <ScrollToTop />
            <App />
          </ThemeProvider>
        </RecoilRoot>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
