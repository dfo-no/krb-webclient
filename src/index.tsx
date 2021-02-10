import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import './i18n';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import { getBanks } from './store/reducers/bank-reducer';
import App from './App';

// Leave this here for debugging. Will be removed later
// import CosmosAPI from './database/CosmosApi';
// import dbConfig from './database/config';

// fetch all banks here because they are published and will show on the front page.
store.dispatch(getBanks());

// Leave this here for debugging. Will be removed later
/* const api = new CosmosAPI(dbConfig);
api
  .createDatabase()
  .then(() => api.readDatabase())
  .then(() => api.createContainer())
  .then(() => api.readContainer())
  .then(() =>
    api.createFamilyItem({
      id: 'Anderson.1',
      Country: 'USA',
      lastName: 'Andersen',
      parents: [
        {
          firstName: 'Thomas'
        },
        {
          firstName: 'Mary Kay'
        }
      ],
      children: [
        {
          firstName: 'Henriette Thaulow',
          gender: 'female',
          grade: 5,
          pets: [
            {
              givenName: 'Fluffy'
            }
          ]
        }
      ],
      address: {
        state: 'WA',
        county: 'King',
        city: 'Seattle'
      }
    })
  ); */

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
