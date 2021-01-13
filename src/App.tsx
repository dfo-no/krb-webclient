import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import styles from './App.module.scss';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import KravbankEditorSide from './KravbankEditorSide/KravbankEditorSide';
import Header from './Header/Header';
import BehovEditorSide from './BehovEditorSide/BehovEditorSide';
import KravbankKatalogSide from './KravbankKatalogSide/KravbankKatalogSide';
import NyKravbankSide from './NyKravbankSide/NyKravbankSide';
import KravEditorSide from './KravEditorSide/KravEditorSide';
import KodelisteEditorSide from './KodelisteEditor/KodelisteEditorSide';
import { Col, Container, Row } from 'react-bootstrap';

import store from './store/configureStore';
import KodelisteKatalogSide from './KodelisteKatalogSide/KodelisteKatalogSide';

function App() {
  const pathName = window.location.pathname;
  return (
    <Provider store={store}>
      <div className={styles.App}>
        <Router>
          <Header />
          {/*<Switch>
                {pathName === '/katalog' || pathName === '/' ? (
                  <Col className="col-3 p-0"></Col>
                ) : (
                  <Col className="col-2 p-0">
                    <SideBar />
                  </Col>
                )}
                </Switch> */}
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
            {/*<Route exact path={'/edit/krav'}>
              <KravEditorSide />
              </Route>*/}
            <Route
              path={'/kodelistekatalog'}
              component={KodelisteKatalogSide}
            ></Route>
            <Route path={'/kodeliste'} component={KodelisteEditorSide}></Route>
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
