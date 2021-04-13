import React, { ReactElement } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import NotFound from '../NotFound';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import { RootState } from '../store/store';
import ProductSpecEditor from './ProductSpecEditor';
import ProductSpecList from './ProductSpecList';
import RequirementSpecEditor from './RequirementSpecEditor';
import SpecEditor from './SpecEditor';
import SpecSideBar from './SpecSideBar';

interface RouteParams {
  bankId: string;
}
export default function SpecModule(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>('/speceditor/:bankId');
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.selectedBank);
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
            <Route path="/speceditor/:id/requirement">
              <RequirementSpecEditor />
            </Route>
            <Route exact path="/speceditor/:id/product">
              <ProductSpecList />
            </Route>
            <Route exact path="/speceditor/:id/product/:productid">
              <ProductSpecEditor />
            </Route>
            <Route exact path="/speceditor/:id/download">
              <SpecEditor />
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
