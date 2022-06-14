import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import ResponseEditor from './ResponseEditor';
import { Box } from '@mui/material/';
import { ResponseProvider } from './ResponseContext';

interface IRouteParams {
  bankId: string;
}
export default function ResponseModule(): React.ReactElement {
  const projectMatch = useRouteMatch<IRouteParams>('/responseeditor/:bankId');
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.selectedBank);
  // Can set this safely, even if we got here directly by url or by clicks
  if (projectMatch?.params.bankId && !id) {
    dispatch(selectBank(projectMatch?.params.bankId));
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Switch>
        <Route exact path="/response/:id">
          <ResponseProvider>
            <ResponseEditor />
          </ResponseProvider>
        </Route>
      </Switch>
    </Box>
  );
}
