import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import './i18n';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import { getBanksThunk } from './store/reducers/bank-reducer';
import App from './App';

console.log(process.env);
// fetch all banks here because they are published and will show on the front page.
store.dispatch(getBanksThunk());

// Hot reload the component tree whenever a component file changes
const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Suspense fallback="">
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
