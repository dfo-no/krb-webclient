import React, { ReactElement, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../NotFound';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getProjectsThunk } from '../store/reducers/project-reducer';
import { selectProject } from '../store/reducers/selectedProject-reducer';
import CodeListEditor from './Codelist/CodeListEditor';
import CodelistPage from './Codelist/CodelistPage';
import NeedPage from './Need/NeedPage';
import ProductPage from './Product/ProductPage';
import ProductPreview from './Product/ProductPreview';
import ProjectPage from './Project/ProjectPage';
import RequirementEditor from './Requirement/RequirementEditor';
import RequirementPage from './Requirement/RequirementPage';
import SideBar from './SideBar/SideBar';
import styles from './WorkBench.module.scss';
import WorkbenchPage from './WorkbenchPage';

interface RouteParams {
  projectId: string;
}

export default function WorkbenchModule(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>('/workbench/:projectId');
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.selectedProject);
  // Can set this safely, even if we got here directly by url or by clicks
  if (projectMatch?.params.projectId && !id) {
    dispatch(selectProject(projectMatch?.params.projectId));
  }

  /* Every child of this WorkbenchModule need the list of projects.
    So we fetch it here instead of in each child. This also makes it
    possible to have a loading-indicator or some other nice stuff */
  useEffect(() => {
    async function fetchEverything() {
      setTimeout(async () => {
        await dispatch(getProjectsThunk());
      });
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
            <Route exact path="/workbench">
              <WorkbenchPage />
            </Route>
            <Route exact path="/workbench/:projectId/need">
              <NeedPage />
            </Route>
            <Route exact path="/workbench/:projectId/need/:needId/requirement">
              <RequirementPage />
            </Route>
            <Route exact path="/workbench/:projectId/requirement">
              <RequirementPage />
            </Route>
            <Route
              exact
              path="/workbench/:projectId/need/:needId/requirement/:requirementId/edit"
            >
              <RequirementEditor />
            </Route>
            <Route exact path="/workbench/:projectId/codelist">
              <CodelistPage />
            </Route>
            <Route exact path="/workbench/:projectId/codelist/:id">
              <CodeListEditor />
            </Route>
            <Route exact path="/workbench/:projectId/product">
              <ProductPage />
            </Route>
            <Route exact path="/workbench/:projectId/:productId/product">
              <ProductPreview />
            </Route>
            <Route exact path="/workbench/:projectId">
              <ProjectPage />
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
