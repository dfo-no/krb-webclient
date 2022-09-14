import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SpecEditor from './SpecEditor';
import { ProductIndexProvider } from '../../components/ProductIndexContext/ProductIndexContext';
import { SpecificationProvider } from './SpecificationContext';

export default function SpecModule(): React.ReactElement {
  return (
    <ProductIndexProvider>
      <Switch>
        <Route exact path="/specification/:id">
          <SpecificationProvider>
            <SpecEditor />
          </SpecificationProvider>
        </Route>
      </Switch>
    </ProductIndexProvider>
  );
}
