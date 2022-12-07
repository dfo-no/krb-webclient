import {
  StyledEngineProvider,
  Theme,
  ThemeProvider,
} from '@mui/material/styles';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';
import theme from './theme';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

// Hot reload the component tree whenever a component file changes
const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Suspense fallback="">
        <Provider store={store}>
          <BrowserRouter>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={theme}>
                <App />
              </ThemeProvider>
            </StyledEngineProvider>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept(['./App'], render);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
