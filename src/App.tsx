import { PublicClientApplication } from '@azure/msal-browser';
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate
} from '@azure/msal-react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import { msalConfig } from './authentication/authConfig';
import Evaluation from './Evaluation/Evaluation';
import Header from './Header/Header';
import HomePage from './Home/HomePage';
import useConfirmTabClose from './hooks/useConfirmTabClose';
import KitchenSink from './KitchenSink';
import PageLayout from './PageLayout';
import PrefilledResponseModule from './PrefilledResponseEditor/PrefilledResponseModule';
import ResponseModule from './ResponseEditor/ResponseModule';
import ResponsePage from './ResponseEditor/ResponsePage';
import SpecModule from './SpecEditor/SpecModule';
import WorkbenchModule from './Workbench/WorkbenchModule';

const msalInstance = new PublicClientApplication(msalConfig);

function App(): React.ReactElement {
  useConfirmTabClose();

  function renderContent() {
    return (
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <PageLayout>
          <AuthenticatedTemplate>
            <Route path="/workbench" component={WorkbenchModule} />
            <Route path="/specification" component={SpecModule} />
            <Route path="/response/:id" component={ResponseModule} />
            <Route exact path="/response" component={ResponsePage} />
            <Route path="/evaluation" component={Evaluation} />
            <Route
              path="/prefilledresponse/:id"
              component={PrefilledResponseModule}
            />
          </AuthenticatedTemplate>
          {process.env.NODE_ENV === 'development' ? (
            <Route path="/kitchensink" component={KitchenSink} />
          ) : (
            <></>
          )}
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
