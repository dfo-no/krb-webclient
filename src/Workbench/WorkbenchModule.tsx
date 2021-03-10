import React, { ReactElement, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import RequirementPage from './Requirement/RequirementPage';
import RequirementEditor from './Requirement/RequirementEditor';
import CodeListEditor from './Codelist/CodeListEditor';
import CodelistPage from './Codelist/CodelistPage';
import NeedPage from './Need/NeedPage';
import ProductPage from './Product/ProductPage';
import ProjectPage from './Project/ProjectPage';
import SideBar from './SideBar/SideBar';
import WorkbenchPage from './WorkbenchPage';
import { getProjectsThunk } from '../store/reducers/project-reducer';
import { RootState } from '../store/store';
import { selectProject } from '../store/reducers/selectedProject-reducer';
import styles from './WorkBench.module.scss';

interface RouteParams {
  projectId: string;
}

export default function WorkbenchModule(): ReactElement {
  const { url } = useRouteMatch();

  const projectMatch = useRouteMatch<RouteParams>('/workbench/:projectId');
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.selectedProject);

  // Can set this safely, even if we got here directly by url or by clicks
  if (projectMatch?.params.projectId && !id) {
    dispatch(selectProject(projectMatch?.params.projectId));
  }

  /* Every child of this WorkbenchModule need the list of projects.
    So we fetch it here instead of in each child. This also makes it
    possible to have a loading-indicator or some other nice stuff */
  useEffect(() => {
    async function fetchEverything() {
      // TODO: remove delay after implementing spinner
      setTimeout(async () => {
        dispatch(getProjectsThunk());
      }, 1000);
    }
    fetchEverything();
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col className="col-2 p-0">
          <SideBar /> {/* Sidebar outside Switch *may* be a very bad idea */}
        </Col>
        <Col className={styles.editor}>
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
            <Route exact path={`${url}/:projectId/requirement/:id/edit`}>
              <RequirementEditor />
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
