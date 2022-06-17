import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

import ResponseEditor from './ResponseEditor';
import { ResponseProvider } from './ResponseContext';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

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
    <Switch>
      <Route exact path="/response/:id">
        <ResponseProvider>
          <ResponseEditor />
        </ResponseProvider>
      </Route>
    </Switch>
  );
}
