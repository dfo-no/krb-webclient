import React from 'react';
import { Route, Switch } from 'react-router';

import SpecEditor from './SpecEditor';
import SpecificationGuard from './SpecificationGuard';
import { ProductIndexProvider } from '../../components/ProductIndexContext/ProductIndexContext';

export default function SpecModule(): React.ReactElement {
  return (
    <ProductIndexProvider>
      <Switch>
        <Route exact path="/specification/:id">
          <SpecificationGuard>
            <SpecEditor />
          </SpecificationGuard>
        </Route>
      </Switch>
    </ProductIndexProvider>
  );
}
