import React from 'react';
import { Route, Switch } from 'react-router';
import SpecEditor from './SpecEditor/SpecEditor';
import { SpecificationProvider } from './SpecificationContext';
import SpecificationGuard from './SpecificationGuard';
import SpecPage from './SpecPage';

export default function SpecModule(): React.ReactElement {
  return (
    <SpecificationProvider>
      <Switch>
        <Route exact path="/specification">
          <SpecPage />
        </Route>
        <Route exact path="/specification/:id">
          <SpecificationGuard>
            <SpecEditor />
          </SpecificationGuard>
        </Route>
      </Switch>
    </SpecificationProvider>
  );
}
