import React from 'react';
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
import SpecPage from './SpecPage';

interface RouteParams {
  bankId: string;
}
export default function SpecModule(): React.ReactElement {
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
        <Switch>
          <Route path="/specification/:id">
            <Col className="col-2 p-0">
              <SpecSideBar />
            </Col>
          </Route>
        </Switch>
        <Col>
          <Switch>
            <Route exact path="/specification">
              <SpecPage />
            </Route>
            <Route exact path="/specification/:id">
              <SpecEditor />
            </Route>
            <Route exact path="/specification/:id/requirement">
              <RequirementSpecEditor />
            </Route>
            <Route
              exact
              path="/specification/:id/requirement/question/:questionid"
            >
              <ConfigureQuestion />
            </Route>
            <Route exact path="/specification/:id/product">
              <ProductSpecList />
            </Route>
            <Route exact path="/specification/:id/product/:productid">
              <ProductSpecEditor />
            </Route>
            <Route
              exact
              path="/specification/:id/product/:productid/question/:questionid"
            >
              <ConfigureProductQuestion />
            </Route>
            <Route exact path="/specification/:id/download">
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
