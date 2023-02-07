import { Route, useParams } from 'react-router-dom';

import AdminGuard from './Admin/AdminGuard';
import Create from './Create/Create';
import LoaderSpinner from '../../common/LoaderSpinner';
import Preview from './Preview/Preview';
import ProjectNotFound from '../../components/ProjectNotFound/ProjectNotFound';
import { PreviewProvider } from './Preview/PreviewContext';
import { SelectProvider } from './Create/SelectContext';
import { useGetProjectQuery } from '../../store/api/bankApi';
import { WORKBENCH } from '../../common/PathConstants';

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
