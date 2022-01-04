import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoaderSpinner from '../common/LoaderSpinner';
import AlertList from '../components/Alert/AlertList';
import { useAppDispatch } from '../store/hooks';
import { getProjectsThunk } from '../store/reducers/project-reducer';
import ProjectGuard from './ProjectGuard';
import Projects from './Projects';
import SideBar from './SideBar/SideBar';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core';
import theme from '../theme';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: 50
  },
  sideBarContainer: {
    flex: '1',
    backgroundColor: theme.palette.gray100.main
  },
  contentContainer: {
    width: '100vw',
    paddingBottom: 30
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
    <Box className={classes.container}>
      <Box className={classes.sideBarContainer}>
        <SideBar />
      </Box>
      <Box className={classes.contentContainer}>
        <AlertList />
        <Switch>
          <Route exact path="/workbench">
            <Projects />
          </Route>
          <Route path="/workbench/:projectId">
            <ProjectGuard />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
