import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';

import styles from './App.module.scss';
import LoginForm from './LoginForm/LoginForm';
import KravbankEditorSide from './KravbankEditorSide/KravbankEditorSide';
import Header from './Header/Header';
import BehovEditorSide from './BehovEditorSide/BehovEditorSide';

import store from './store/configureStore';
import CodeListEditor from './Workbench/Codelist/CodeListEditor';
import ProductPage from './Workbench/Product/ProductPage';
import ProjectPage from './Workbench/Project/ProjectPage';
import NeedPage from './Need/NeedPage';
import RequirementPage from './Requirement/RequirementPage';
import WorkbenchPage from './Workbench/WorkbenchPage';
import HomePage from './Home/HomePage';
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from './SideBar/SideBar';
import KravEditorSide from './KravEditorSide/KravEditorSide';
import { ProtectedRoute } from './authentication/ProtectedRoute';
import CodelistPage from './Workbench/Codelist/CodelistPage';

function App() {
  const location = useLocation();
  return (
    <Provider store={store}>
      <div className={styles.App}>
        <Header />
        <Container fluid>
          <Row>
            {location.pathname === '/' ||
            location.pathname === '/katalog' ||
            location.pathname === '/login' ? (
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
                </Route>
                <Route exact path={'/login'} component={LoginForm} />
                {/* to be deprecated */}
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
                {/* end deprectation */}
                <ProtectedRoute
                  exact
                  path={'/workbench'}
                  component={WorkbenchPage}
                ></ProtectedRoute>

                <ProtectedRoute
                  exact
                  path={'/workbench/need'}
                  component={NeedPage}
                />
                <ProtectedRoute
                  exact
                  path={'/workbench/requirement'}
                  component={RequirementPage}
                />
                <ProtectedRoute
                  exact
                  path={'/workbench/codelist'}
                  component={CodelistPage}
                />
                <ProtectedRoute
                  exact
                  path={'/workbench/codelist/:id'}
                  component={CodeListEditor}
                />
                <ProtectedRoute
                  exact
                  path={'/workbench/product'}
                  component={ProductPage}
                />
                <ProtectedRoute
                  exact
                  path={'/workbench/:id'}
                  component={ProjectPage}
                />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
