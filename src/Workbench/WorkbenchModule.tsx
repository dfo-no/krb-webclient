import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoaderSpinner from '../common/LoaderSpinner';
import { useAppDispatch } from '../store/hooks';
import { getProjectsThunk } from '../store/reducers/project-reducer';
import theme from '../theme';
import ProjectGuard from './ProjectGuard';
import Projects from './Projects/Projects';

const useStyles = makeStyles({
  workbenchContainer: {
    width: '100%',
    flexGrow: 1,
    minHeight: 0,
    backgroundColor: theme.palette.backgroundBlue.main
  }
});

export default function WorkbenchModule(): React.ReactElement {
  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState(true);
  const classes = useStyles();

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
    <Box className={classes.workbenchContainer}>
      <Switch>
        <Route exact path="/workbench">
          <Projects />
        </Route>
        <Route path="/workbench/:projectId">
          <ProjectGuard />
        </Route>
      </Switch>
    </Box>
  );
}
