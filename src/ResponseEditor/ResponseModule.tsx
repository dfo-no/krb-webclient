import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Route, Switch, useRouteMatch } from 'react-router';
import NotFound from '../NotFound';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import ResponseDownLoad from './Download/ResponseDownLoad';
import ResponseEditor from './Editor/ResponseEditor';
import OverView from './Overview/Overview';
import ProductResponseList from './Product/ProductResponsList';
import ResponseProductEditor from './Product/ResponseProductEditor';
import RequirementPage from './Requirement/RequirementPage';
import ResponseSideBar from './SideBar/ResponseSideBar';

interface IRouteParams {
  bankId: string;
}
export default function SpecModule(): React.ReactElement {
  const projectMatch = useRouteMatch<IRouteParams>('/responseeditor/:bankId');
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
          <ResponseSideBar />
          {/* Sidebar outside Switch *may* be a very bad idea */}
        </Col>
        <Col>
          <Switch>
            <Route exact path="/response/:id">
              <ResponseEditor />
            </Route>
            <Route exact path="/response/:id/product">
              <ProductResponseList />
            </Route>
            <Route exact path="/response/:id/product/:productId">
              <ResponseProductEditor />
            </Route>
            <Route exact path="/response/:id/requirement">
              <RequirementPage />
            </Route>
            <Route exact path="/response/:id/download">
              <ResponseDownLoad />
            </Route>
            <Route exact path="/response/:id/overview">
              <OverView />
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
