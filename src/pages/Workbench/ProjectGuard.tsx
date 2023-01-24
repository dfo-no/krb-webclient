import React from 'react';
import { Route, useParams } from 'react-router-dom';

import AdminGuard from './Admin/AdminGuard';
import Create from './Create/Create';
import LoaderSpinner from '../../common/LoaderSpinner';
import Preview from './Preview/Preview';
import ProjectNotFound from '../../components/ProjectNotFound/ProjectNotFound';
import { PreviewProvider } from './Preview/PreviewContext';
import { SelectProvider } from './Create/SelectContext';
import { WORKBENCH } from '../../common/PathConstants';
import { useFindOneProject } from '../../api/openapi-fetch';

interface RouteParams {
  projectId: string;
}

// TODO: What about this name?
export default function ProjectGuard(): React.ReactElement {
  // const { projectId: projectRef } = useParams<RouteParams>();
  // console.log(projectRef);
  // const { project, isLoading } = useFindOneProject(projectRef);
  // console.log(project, isLoading);

  // if (isLoading) {
  //   return <LoaderSpinner />;
  // }

  // if (!project) {
  //   return <ProjectNotFound />;
  // }

  return (
    <div>
      <Route path={`/${WORKBENCH}/:projectId/admin`}>
        <AdminGuard />
      </Route>
      <Route path={`/${WORKBENCH}/:projectId/create`}>
        <SelectProvider>
          <Create />
        </SelectProvider>
      </Route>
      <Route path={`${WORKBENCH}/:projectId/preview`}>
        <PreviewProvider>
          <Preview />
        </PreviewProvider>
      </Route>
    </div>
  );
}
