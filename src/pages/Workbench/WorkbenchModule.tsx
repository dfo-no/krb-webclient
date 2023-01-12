import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { WORKBENCH } from '../../common/PathConstants';
import AuthenticatedLayout from '../../components/AuthenticatedLayout/AuthenticatedLayout';
import ProjectGuard from './ProjectGuard';
import { Projects } from './Projects/Projects';

export default function WorkbenchModule(): React.ReactElement {
  return (
    <AuthenticatedLayout>
      <div>
        <Switch>
          <Route exact path={`/${WORKBENCH}`}>
            <Projects />
          </Route>
          <Route path={`/${WORKBENCH}/:projectId`}>
            <ProjectGuard />
          </Route>
        </Switch>
      </div>
    </AuthenticatedLayout>
  );
}
