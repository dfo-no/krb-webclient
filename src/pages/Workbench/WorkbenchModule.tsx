import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticatedLayout from '../../components/AuthenticatedLayout/AuthenticatedLayout';
import ProjectGuard from './ProjectGuard';
import Projects from './Projects/Projects';

export default function WorkbenchModule(): React.ReactElement {
  return (
    <AuthenticatedLayout>
      <div>
        <Switch>
          <Route exact path="/workbench">
            <Projects />
          </Route>
          <Route path="/workbench/:projectId">
            <ProjectGuard />
          </Route>
        </Switch>
      </div>
    </AuthenticatedLayout>
  );
}
