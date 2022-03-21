import { Box } from '@mui/material';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import SpecSideBar from './SideBar/SpecSideBar';
import SpecEditor from './SpecEditor/SpecEditor';
import SpecPage from './SpecPage';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../theme';
import NewProduct from './SpecEditor/NewProduct';

interface IRouteParams {
  bankId: string;
}

const useStyles = makeStyles({
  specification: {
    display: 'flex',
    height: '100%',
    backgroundColor: theme.palette.gray100.main
  }
});

export default function SpecModule(): React.ReactElement {
  const projectMatch = useRouteMatch<IRouteParams>('/speceditor/:bankId');
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.selectedBank);
  // Can set this safely, even if we got here directly by url or by clicks
  if (projectMatch?.params.bankId && !id) {
    dispatch(selectBank(projectMatch?.params.bankId));
  }

  const classes = useStyles();

  return (
    <Switch>
      <Route exact path="/specification">
        <SpecPage />
      </Route>

      <Box className={classes.specification}>
        <SpecSideBar />
        <Route exact path="/specification/:id">
          <SpecEditor />
        </Route>
        <Route exact path="/specification/:id/createProduct">
          <NewProduct />
        </Route>
      </Box>
    </Switch>
  );
}
