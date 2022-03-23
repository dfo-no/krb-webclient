import React from 'react';
import { Route, Switch } from 'react-router';
import NotFound from '../NotFound';
import DownloadPage from './Download/DownloadPage';
import ConfigureProductQuestion from './Product/ConfigureProductQuestion';
import ProductSpecEditor from './Product/ProductSpecEditor';
import ProductSpecList from './Product/ProductSpecList';
import ConfigureQuestion from './Requirement/ConfigureQuestion';
import RequirementSpecEditor from './Requirement/RequirementSpecEditor';
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
        <Route exact path="/specification/:id/requirement">
          <RequirementSpecEditor />
        </Route>
        <Route exact path="/specification/:id/requirement/question/:questionid">
          <ConfigureQuestion />
        </Route>
        <Route exact path="/specification/:id/product">
          <ProductSpecList />
        </Route>
        <Route exact path="/specification/:id/product/:productid">
          <ProductSpecEditor />
        </Route>
        <Route
          exact
          path="/specification/:id/product/:productid/question/:questionid"
        >
          <ConfigureProductQuestion />
        </Route>
        <Route exact path="/specification/:id/download">
          <DownloadPage />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </SpecificationProvider>
  );
}
