import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AuthenticatedLayout from '../../components/AuthenticatedLayout/AuthenticatedLayout';
import ProjectGuard from './ProjectGuard';
// import Projects from './Projects/Projects';
import { WORKBENCH } from '../../common/PathConstants';
import { ProjectsNew } from './Projects/ProjectsNew';
import Projects from './Projects/Projects';

export default function WorkbenchModule(): React.ReactElement {
  return (
    <AuthenticatedLayout>
      <div>
        <Switch>
          <Route exact path={`/${WORKBENCH}`}>
            <Projects />
          </Route>
          <Route exact path={`/${WORKBENCH}_new`}>
            <ProjectsNew />
          </Route>
          <Route path={`/${WORKBENCH}/:projectId`}>
            <ProjectGuard />
          </Route>
        </Switch>
      </div>
    </AuthenticatedLayout>
  );
}
