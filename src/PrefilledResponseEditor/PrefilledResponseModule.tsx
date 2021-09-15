import React, { ReactElement } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Route, Switch, useRouteMatch } from 'react-router';
import NotFound from '../NotFound';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import PrefilledResponseEditor from './Editor/PrefilledResponseEditor';
import PrefilledResponseSidebar from './SideBar/PrefilledResponseSidebar';

interface RouteParams {
  bankId: string;
}
export default function PrefilledResponseModule(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>('/responseeditor/:bankId');
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
          <PrefilledResponseSidebar />
          {/* Sidebar outside Switch *may* be a very bad idea */}
        </Col>
        <Col>
          <Switch>
            <Route exact path="/prefilledresponse/:id">
              <PrefilledResponseEditor />
            </Route>
            <Route exact path="/prefilledresponse/:id/product">
              <PrefilledResponseEditor />
            </Route>
            <Route exact path="/prefilledresponse/:id/product/:productId">
              <PrefilledResponseEditor />
            </Route>
            <Route exact path="/prefilledresponse/:id/requirement">
              <PrefilledResponseEditor />
            </Route>
            <Route exact path="/prefilledresponse/:id/download">
              <PrefilledResponseEditor />
            </Route>
            <Route exact path="/prefilledresponse/:id/overview">
              <PrefilledResponseEditor />
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
