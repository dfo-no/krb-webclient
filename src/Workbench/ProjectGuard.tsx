import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { Route, useParams } from 'react-router-dom';
import LoaderSpinner from '../common/LoaderSpinner';
import { useGetProjectQuery } from '../store/api/bankApi';
import { useAppDispatch } from '../store/hooks';
import { getProjectThunk } from '../store/reducers/project-reducer';
import AdminGuard from './Admin/AdminGuard';
import ProjectNotFound from './Components/ProjectNotFound';
import Create from './Create/Create';
import { SelectProvider } from './Create/SelectContext';
import Preview from './Preview/Preview';

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
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState(false);
  const classes = useStyles();

  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);

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
        <Preview />
      </Route>
    </Box>
  );
}
