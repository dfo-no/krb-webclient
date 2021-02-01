import React, { ReactElement, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import RequirementPage from './Requirement/RequirementPage';
import CodeListEditor from './Codelist/CodeListEditor';
import CodelistPage from './Codelist/CodelistPage';
import NeedPage from './Need/NeedPage';
import ProductPage from './Product/ProductPage';
import ProjectPage from './Project/ProjectPage';
import SideBar from './SideBar/SideBar';
import WorkbenchPage from './WorkbenchPage';
import { useDispatch } from 'react-redux';
import { getProjectsThunk } from '../store/reducers/project-reducer';

export default function WorkbenchModule(): ReactElement {
  let { url } = useRouteMatch();
  const dispatch = useDispatch();

  /* Every child of this WorkbenchModule need the list of projects.
     So we fetch it here instead of in each child. This also makes it
     possible to have a loading-indicator or some other nice stuff */
  useEffect(() => {
    async function fetchEverything() {
      dispatch(getProjectsThunk());
    }
    fetchEverything();
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col className="col-2 p-0">
          <SideBar /> {/* Sidebar outside Switch *may* be a very bad idea */}
        </Col>
        <Col>
          <Switch>
            <Route exact path={`${url}`}>
              <WorkbenchPage />
            </Route>
            <Route exact path={`${url}/:projectId/need`}>
              <NeedPage />
            </Route>
            <Route exact path={`${url}/:projectId/requirement`}>
              <RequirementPage />
            </Route>
            <Route exact path={`${url}/:projectId/codelist`}>
              <CodelistPage />
            </Route>
            <Route exact path={`${url}/:projectId/codelist/:id`}>
              <CodeListEditor />
            </Route>
            <Route exact path={`${url}/:projectId/product`}>
              <ProductPage />
            </Route>
            <Route exact path={`${url}/:projectId`}>
              <ProjectPage />
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}
