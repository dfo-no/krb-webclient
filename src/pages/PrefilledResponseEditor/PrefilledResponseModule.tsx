import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React from 'react';
import Row from 'react-bootstrap/Row';
import { Route, Switch, useRouteMatch } from 'react-router';

import NotFound from '../../NotFound';
import PrefilledResponseDownLoad from './Download/PrefilledResponseDownload';
import PrefilledResponseEditor from './Editor/PrefilledResponseEditor';
import PrefilledResponseProductEditor from './Product/PrefilledResponseProductEditor';
import PrefilledResponseProductList from './Product/PrefilledResponseProductList';
import PrefilledResponseSidebar from './SideBar/PrefilledResponseSidebar';
import RequirementList from './Requirement/RequirementList';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface IRouteParams {
  bankId: string;
}

export default function PrefilledResponseModule(): React.ReactElement {
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
          <PrefilledResponseSidebar />
          {/* Sidebar outside Switch *may* be a very bad idea */}
        </Col>
        <Col>
          <Switch>
            <Route exact path="/prefilledresponse/:id">
              <PrefilledResponseEditor />
            </Route>
            <Route exact path="/prefilledresponse/:id/product">
              <PrefilledResponseProductList />
            </Route>
            <Route exact path="/prefilledresponse/:id/product/:productId">
              <PrefilledResponseProductEditor />
            </Route>
            <Route exact path="/prefilledresponse/:id/requirement">
              <RequirementList />
            </Route>
            <Route exact path="/prefilledresponse/:id/download">
              <PrefilledResponseDownLoad />
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
