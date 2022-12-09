import React from 'react';
import { Route, useParams } from 'react-router-dom';
import { Fetcher } from 'openapi-typescript-fetch';

import AdminGuard from './Admin/AdminGuard';
import Create from './Create/Create';
import LoaderSpinner from '../../common/LoaderSpinner';
import Preview from './Preview/Preview';
import ProjectNotFound from '../../components/ProjectNotFound/ProjectNotFound';
import { PreviewProvider } from './Preview/PreviewContext';
import { SelectProvider } from './Create/SelectContext';
import { useGetProjectQuery } from '../../store/api/bankApi';
import { paths } from './../../api/generated';
import { WORKBENCH } from '../../common/PathConstants';

interface RouteParams {
  projectId: string;
}

export default function ProjectGuard(): React.ReactElement {
  const { projectId } = useParams<RouteParams>();
  const { data: project, isLoading } = useGetProjectQuery(projectId);

  // declare fetcher for paths
  const fetcher = Fetcher.for<paths>();

  fetcher.configure({
    baseUrl: 'https://krb-backend-api.azurewebsites.net',
    // init: {
    //   headers: {
    //     ...
    // },
    // },
    // use: [...] // middlewares
  });

  const findProjects = fetcher.path('/api/v1/projects').method('get').create();
  findProjects({}).then((projects) => console.log(projects));

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!project) {
    return <ProjectNotFound />;
  }

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
