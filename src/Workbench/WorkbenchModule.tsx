import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Route, Switch } from 'react-router-dom';
import LoaderSpinner from '../common/LoaderSpinner';
import AlertList from '../components/Alert/AlertList';
import { useAppDispatch } from '../store/hooks';
import { getProjectsThunk } from '../store/reducers/project-reducer';
import ProjectGuard from './ProjectGuard';
import Projects from './Projects';
import SideBar from './SideBar/SideBar';
import styles from './WorkBench.module.scss';

export default function WorkbenchModule(): React.ReactElement {
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState(true);

  /* Every child of this WorkbenchModule need the list of projects.
    So we fetch it here instead of in each child. This also makes it
    possible to have a loading-indicator or some other nice stuff */
  useEffect(() => {
    async function doAsyncWork() {
      await dispatch(getProjectsThunk()).then(() => {
        setLoading(false);
      });
    }
    doAsyncWork();
  }, [dispatch, setLoading]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  return (
    <Container fluid className={styles.container}>
      <Row>
        <Col className="col-2 p-0">
          <SideBar />
        </Col>
        <Col className={styles.editor}>
          <AlertList />
          <Switch>
            <Route exact path="/workbench">
              <Projects />
            </Route>
            <Route path="/workbench/:projectId">
              <ProjectGuard />
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}
