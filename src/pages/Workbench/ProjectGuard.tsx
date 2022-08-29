import React from 'react';
import { Route, useParams } from 'react-router-dom';

import AdminGuard from './Admin/AdminGuard';
import Create from './Create/Create';
import LoaderSpinner from '../../common/LoaderSpinner';
import Preview from './Preview/Preview';
import ProjectNotFound from '../../components/ProjectNotFound/ProjectNotFound';
import { PreviewProvider } from './Preview/PreviewContext';
import { SelectProvider } from './Create/SelectContext';
import { useGetProjectQuery } from '../../store/api/bankApi';

interface IRouteParams {
  projectId: string;
}

export default function ProjectGuard(): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
  const { data: project, isLoading } = useGetProjectQuery(projectId);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <div>
      <Route path="/workbench/:projectId/admin">
        <AdminGuard />
      </Route>
      <Route path="/workbench/:projectId/create">
        <SelectProvider>
          <Create />
        </SelectProvider>
      </Route>
      <Route path="/workbench/:projectId/preview">
        <PreviewProvider>
          <Preview />
        </PreviewProvider>
      </Route>
    </div>
  );
}
