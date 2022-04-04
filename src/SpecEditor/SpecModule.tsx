import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { Route, Switch } from 'react-router';
import theme from '../theme';
import SpecSideBar from './SideBar/SpecSideBar';
import NewProduct from './SpecEditor/NewProduct';
import SpecEditor from './SpecEditor/SpecEditor';
import { SpecificationProvider } from './SpecificationContext';
import SpecificationGuard from './SpecificationGuard';
import SpecPage from './SpecPage';

const useStyles = makeStyles({
  specification: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.palette.gray100.main
  }
});

export default function SpecModule(): React.ReactElement {
  const classes = useStyles();

  return (
    <SpecificationProvider>
      <Switch>
        <Route exact path="/specification">
          <SpecPage />
        </Route>
        <Box className={classes.specification}>
          <SpecSideBar />
          <Route exact path="/specification/:id">
            <SpecificationGuard>
              <SpecEditor />
            </SpecificationGuard>
          </Route>
          <Route exact path="/specification/:id/createProduct">
            <NewProduct />
          </Route>
        </Box>
      </Switch>
    </SpecificationProvider>
  );
}
