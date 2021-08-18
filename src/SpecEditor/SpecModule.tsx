import React, { ReactElement } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Route, Switch, useRouteMatch } from 'react-router';
import NotFound from '../NotFound';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import DownloadPage from './Download/DownloadPage';
import ConfigureProductQuestion from './Product/ConfigureProductQuestion';
import ProductSpecEditor from './Product/ProductSpecEditor';
import ProductSpecList from './Product/ProductSpecList';
import ConfigureQuestion from './Requirement/ConfigureQuestion';
import RequirementSpecEditor from './Requirement/RequirementSpecEditor';
import SpecSideBar from './SideBar/SpecSideBar';
import SpecEditor from './SpecEditor/SpecEditor';

interface RouteParams {
  bankId: string;
}
export default function SpecModule(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>('/speceditor/:bankId');
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.selectedBank);
  // Can set this safely, even if we got here directly by url or by clicks
  if (projectMatch?.params.bankId && !id) {
    dispatch(selectBank(projectMatch?.params.bankId));
  }

  return (
    <Container fluid>
      <Row>
        <Col className="col-2 p-0">
          <SpecSideBar />
          {/* Sidebar outside Switch *may* be a very bad idea */}
        </Col>
        <Col>
          <Switch>
            <Route exact path="/speceditor/:id">
              <SpecEditor />
            </Route>
            <Route exact path="/speceditor/:id/requirement">
              <RequirementSpecEditor />
            </Route>
            <Route
              exact
              path="/speceditor/:id/requirement/question/:questionid"
            >
              <ConfigureQuestion />
            </Route>
            <Route exact path="/speceditor/:id/product">
              <ProductSpecList />
            </Route>
            <Route exact path="/speceditor/:id/product/:productid">
              <ProductSpecEditor />
            </Route>
            <Route
              exact
              path="/speceditor/:id/product/:productid/question/:questionid"
            >
              <ConfigureProductQuestion />
            </Route>
            <Route exact path="/speceditor/:id/download">
              <DownloadPage />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}
