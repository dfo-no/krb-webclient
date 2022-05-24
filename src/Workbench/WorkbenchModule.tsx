import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import theme from '../theme';
import ProjectGuard from './ProjectGuard';
import Projects from './Projects/Projects';
import AuthenticatedLayout from '../components/AuthenticatedLayout/AuthenticatedLayout';

const useStyles = makeStyles({
  workbenchContainer: {
    width: '100%',
    flexGrow: 1,
    minHeight: 0,
    backgroundColor: theme.palette.backgroundBlue.main
  }
});

export default function WorkbenchModule(): React.ReactElement {
  const classes = useStyles();

  return (
    <AuthenticatedLayout>
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
    </AuthenticatedLayout>
  );
}
