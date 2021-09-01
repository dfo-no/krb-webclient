import React, { useEffect, useState } from 'react';
import { Route, useParams } from 'react-router-dom';
import LoaderSpinner from '../common/LoaderSpinner';
import { useAppDispatch } from '../store/hooks';
import { getProjectThunk } from '../store/reducers/project-reducer';
import CodelistGuard from './Codelist/CodelistGuard';
import CodelistPage from './Codelist/CodelistPage';
import NeedPage from './Need/NeedPage';
import ProductGuard from './Product/ProductGuard';
import ProductPage from './Product/ProductPage';
import ProjectPage from './Project/ProjectPage';
import RequirementEditor from './Requirement/RequirementEditor';
import RequirementPage from './Requirement/RequirementPage';

interface RouteParams {
  projectId: string;
}

export default function ProjectGuard(): JSX.Element {
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState(false);

  const { projectId } = useParams<RouteParams>();

  useEffect(() => {
    async function doAsyncWork() {
      if (projectId) {
        setLoading(true);
        dispatch(getProjectThunk(projectId)).then(() => {
          setLoading(false);
        });
      }
    }
    doAsyncWork();
  }, [dispatch, projectId]);

  if (isLoading) {
    return <LoaderSpinner variant="danger" />;
  }

  return (
    <>
      <Route exact path="/workbench/:projectId">
        <ProjectPage />
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
        <CodelistGuard />
      </Route>
      <Route exact path="/workbench/:projectId/product">
        <ProductPage />
      </Route>
      <Route exact path="/workbench/:projectId/:productId/product">
        <ProductGuard />
      </Route>
    </>
  );
}
