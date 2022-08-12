import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticatedLayout from '../../components/AuthenticatedLayout/AuthenticatedLayout';
import ProjectGuard from './ProjectGuard';
import Projects from './Projects/Projects';

const useStyles = makeStyles({
  workbenchContainer: {
    width: '100%',
    minHeight: '100%'
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
