import { Box, makeStyles, Toolbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Route, useParams } from 'react-router-dom';
import LoaderSpinner from '../common/LoaderSpinner';
import { useAppDispatch } from '../store/hooks';
import { getProjectThunk } from '../store/reducers/project-reducer';
import theme from '../theme';
import AdminGuard from './AdminGuard';
import ProjectHeader from './Components/ProjectHeader';

interface IRouteParams {
  projectId: string;
}

const useStyles = makeStyles({
  projectContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },
  wrapperContainer: {
    display: 'flex',
    flexDirection: 'row',

    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  }
});

export default function ProjectGuard(): React.ReactElement {
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState(false);
  const classes = useStyles();

  const { projectId } = useParams<IRouteParams>();

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
    <Box className={classes.projectContainer}>
      <Box>
        <ProjectHeader />
      </Box>
      <Box className={classes.wrapperContainer}>
        <Route path="/workbench/:projectId/admin">
          <AdminGuard />
        </Route>
        {/*TODO: Create pages for these*/}
        <Route path="/workbench/:projectId/create">Create</Route>
        <Route path="/workbench/:projectId/preview">Preview</Route>
      </Box>
    </Box>
  );
}
