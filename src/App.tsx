import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';

import styles from './App.module.scss';
// import RegistrationForm from './RegistrationForm/RegistrationForm';
import KravbankEditorSide from './KravbankEditorSide/KravbankEditorSide';
import Header from './Header/Header';
import BehovEditorSide from './BehovEditorSide/BehovEditorSide';
import KravbankKatalogSide from './KravbankKatalogSide/KravbankKatalogSide';
import NyKravbankSide from './NyKravbankSide/NyKravbankSide';

import store from './store/configureStore';
import KodelisteKatalogSide from './KodelisteKatalogSide/KodelisteKatalogSide';
import KodelisteEditor from './KodelisteEditor/KodelisteEditor';
import CodelistPage from './Codelist/CodelistPage';
import ProductPage from './Product/ProductPage';
import ProjectPage from './Project/ProjectPage';
import NeedPage from './Need/NeedPage';
import RequirementPage from './Requirement/RequirementPage';
import WorkbenchPage from './Workbench/WorkbenchPage';
import HomePage from './Home/HomePage';
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from './SideBar/SideBar';
import KravEditorSide from './KravEditorSide/KravEditorSide';

function App() {
  const location = useLocation();
  return (
    <Provider store={store}>
      <div className={styles.App}>
        <Header />
        <Container fluid>
          <Row>
            {location.pathname === '/' || location.pathname === '/katalog' ? (
              <></>
            ) : (
              <Col className="col-2 p-0">
                <SideBar />
              </Col>
            )}
            <Col>
              <Switch>
                <Route exact path={'/'}>
                  <HomePage></HomePage>
                  {/* <RegistrationForm /> */}
                </Route>
                {/* to be deprecated */}
                <Route exact path={'/katalog'}>
                  <KravbankKatalogSide />
                </Route>
                <Route exact path={'/edit/:id'}>
                  <KravbankEditorSide />
                </Route>
                <Route exact path={'/edit/behov/'}>
                  <BehovEditorSide />
                </Route>
                <Route exact path={'/edit/krav/'}>
                  <KravEditorSide />
                </Route>
                <Route exact path={'/edit/kravbank'}>
                  <KravbankEditorSide />
                </Route>
                <Route exact path={'/kravbank/ny'}>
                  <NyKravbankSide />
                </Route>
                {/* end deprectation */}
                <Route exact path={'/workbench'}>
                  <WorkbenchPage></WorkbenchPage>
                </Route>

                <Route exact path={'/workbench/need'}>
                  <NeedPage></NeedPage>
                </Route>
                <Route exact path={'/workbench/requirement'}>
                  <RequirementPage></RequirementPage>
                </Route>
                <Route exact path={'/workbench/codelist'}>
                  <CodelistPage></CodelistPage>
                </Route>
                <Route exact path={'/workbench/product'}>
                  <ProductPage></ProductPage>
                </Route>
                <Route exact path={'/workbench/:id'}>
                  <ProjectPage></ProjectPage>
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
