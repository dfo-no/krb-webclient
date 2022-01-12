import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoaderSpinner from '../common/LoaderSpinner';
import AlertList from '../components/Alert/AlertList';
import { useAppDispatch } from '../store/hooks';
import { getProjectsThunk } from '../store/reducers/project-reducer';
import theme from '../theme';
import NewProjectPage from './Project/NewProjectPage';
import ProjectGuard from './ProjectGuard';
import Projects from './Projects';
import SideBar from './SideBar/SideBar';

const useStyles = makeStyles({
  workbenchContainer: {
    display: 'flex',
    gap: 50,

    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },
  sideBarContainer: {
    flex: '1',
    backgroundColor: theme.palette.gray100.main
  },
  editorContainer: {
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
    <Box className={classes.workbenchContainer}>
      <Box className={classes.sideBarContainer}>
        <SideBar />
      </Box>
      <Box className={classes.editorContainer}>
        <AlertList />
        <Switch>
          <Route exact path="/workbench">
            <Projects />
          </Route>
          <Route exact path="/workbench/project/new">
            <NewProjectPage />
          </Route>
          <Route path="/workbench/:projectId">
            <ProjectGuard />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
