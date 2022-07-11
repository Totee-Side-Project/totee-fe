declare module 'react-quill';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import { Global } from '@emotion/react';
import { ThemeProvider } from '@emotion/react';
import globalStyle from '@styles/globalStyle';
import { theme } from '@styles/theme';
import './index.css';


const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <Global styles={globalStyle} />
            <App />
          </ThemeProvider>
        </RecoilRoot>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
