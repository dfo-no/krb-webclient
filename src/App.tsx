/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PublicClientApplication } from '@azure/msal-browser';
import {
  MsalProvider,
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from '@azure/msal-react';

import styles from './App.module.scss';
import Header from './Header/Header';
import HomePage from './Home/HomePage';
import BankPage from './Home/BankPage';
import WorkbenchModule from './Workbench/WorkbenchModule';
import ResponseEditor from './ResponseEditor/ResponseEditor';
import SpecEditor from './SpecEditor/SpecEditor';
import Evaluation from './Evaluation/Evaluation';
import { msalConfig } from './authentication/authConfig';
import PageLayout from './PageLayout';
import SpecPage from './SpecEditor/SpecPage';
import SpecModule from './SpecEditor/SpecModule';

const msalInstance = new PublicClientApplication(msalConfig);

function App(): ReactElement {
  return (
    <div className={styles.App}>
      <MsalProvider instance={msalInstance}>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <PageLayout>
            <AuthenticatedTemplate>
              <Route path="/workbench" component={WorkbenchModule} />
              <Route exact path="/speceditor" component={SpecPage} />
              <Route exact path="/speceditor/:id" component={SpecModule} />
              <Route path="/responseeditor" component={ResponseEditor} />
              <Route path="/evaluation" component={Evaluation} />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <h5 className="card-title">Please sign-in to access this page</h5>
            </UnauthenticatedTemplate>
          </PageLayout>
        </Switch>
      </MsalProvider>
    </div>
  );
}

export default App;
