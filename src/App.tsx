import React, { ReactElement } from 'react';
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
import ResponsePage from './ResponseEditor/ResponsePage';
import Evaluation from './Evaluation/Evaluation';
import { msalConfig } from './authentication/authConfig';
import PageLayout from './PageLayout';
import SpecPage from './SpecEditor/SpecPage';
import SpecModule from './SpecEditor/SpecModule';
import ResponseModule from './ResponseEditor/ResponseModule';

const msalInstance = new PublicClientApplication(msalConfig);

function App(): ReactElement {
  function renderContent() {
    return (
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/bank/:bankId">
          <BankPage />
        </Route>
        <PageLayout>
          <AuthenticatedTemplate>
            <Route path="/workbench" component={WorkbenchModule} />
            <Route path="/speceditor/:id" component={SpecModule} />
            <Route exact path="/speceditor" component={SpecPage} />
            <Route path="/response/:id" component={ResponseModule} />
            <Route exact path="/response" component={ResponsePage} />
            <Route path="/evaluation" component={Evaluation} />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <h5 className="card-title">Please sign-in to access this page</h5>
          </UnauthenticatedTemplate>
        </PageLayout>
      </Switch>
    );
  }

  return (
    <div className={styles.App}>
      <MsalProvider instance={msalInstance}>
        <Header />
        {renderContent()}
      </MsalProvider>
    </div>
  );
}

export default App;
