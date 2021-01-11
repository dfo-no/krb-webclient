import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'react-bootstrap/dist/react-bootstrap.min.js';

import styles from './App.module.scss';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import KravbankEditorSide from './KravbankEditorSide/KravbankEditorSide';
import Header from './Header/Header';
import BehovEditorSide from './BehovEditorSide/BehovEditorSide';
import KravbankKatalogSide from './KravbankKatalogSide/KravbankKatalogSide';
import NyKravbankSide from './NyKravbankSide/NyKravbankSide';
import { store } from './store';
import KravEditorSide from './KravEditorSide/KravEditorSide';

function App() {
  return (
    <Provider store={store}>
      <div className={styles.App}>
        <Router>
          <Header />
          <Switch>
            <Route exact path={'/'}>
              <RegistrationForm />
            </Route>
            <Route exact path={'/katalog'}>
              <KravbankKatalogSide />
            </Route>
            <Route exact path={'/edit/:id'}>
              <KravbankEditorSide />
            </Route>
            <Route exact path={'/edit/behov/:id'}>
              <BehovEditorSide />
            </Route>
            <Route exact path={'/edit/krav/:id'}>
              <KravEditorSide />
            </Route>
            <Route exact path={'/kravbank'}>
              <KravbankEditorSide />
            </Route>
            <Route exact path={'/kravbank/ny'}>
              <NyKravbankSide />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
