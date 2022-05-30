import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { Route, useParams } from 'react-router-dom';
import LoaderSpinner from '../../common/LoaderSpinner';
import { useGetProjectQuery } from '../../store/api/bankApi';
import AdminGuard from './Admin/AdminGuard';
import ProjectNotFound from '../../components/ProjectNotFound/ProjectNotFound';
import Create from './Create/Create';
import { SelectProvider } from './Create/SelectContext';
import Preview from './Preview/Preview';
import { PreviewProvider } from './Preview/PreviewContext';

interface IRouteParams {
  projectId: string;
}

const useStyles = makeStyles({
  wrapperContainer: {
    height: '100%',
    width: '100%'
  }
});

export default function ProjectGuard(): React.ReactElement {
  const classes = useStyles();

  const { projectId } = useParams<IRouteParams>();
  const { data: project, isLoading } = useGetProjectQuery(projectId);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <Box className={classes.wrapperContainer}>
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
    </Box>
  );
}
