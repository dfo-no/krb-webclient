import React from 'react';
import { Route, Switch } from 'react-router';

import SpecEditor from './SpecEditor';
import SpecificationGuard from './SpecificationGuard';
import { SpecificationProvider } from './SpecificationContext';

export default function SpecModule(): React.ReactElement {
  return (
    <SpecificationProvider>
      <Switch>
        <Route exact path="/specification/:id">
          <SpecificationGuard>
            <SpecEditor />
          </SpecificationGuard>
        </Route>
      </Switch>
    </SpecificationProvider>
  );
}
