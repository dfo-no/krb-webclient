import React, { ReactElement } from 'react';
import { CssBaseline } from '@mui/material';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { Route, Switch } from 'react-router-dom';

import AlertList from './components/Alert/AlertList';
import Evaluation from './pages/Evaluation/Evaluation';
import Header from './components/Header/Header';
import HomePage from './pages/Home/HomePage';
import PrefilledResponseModule from './pages/PrefilledResponseEditor/PrefilledResponseModule';
import ResponseModule from './pages/Response/ResponseModule';
import ResponsePage from './pages/Response/ResponsePage';
import SpecModule from './pages/SpecEditor/SpecModule';
import styles from './App.module.scss';
import useConfirmTabClose from './hooks/useConfirmTabClose';
import WorkbenchModule from './pages/Workbench/WorkbenchModule';
import { HomeProvider } from './pages/Home/HomeContext';
import { msalConfig } from './authentication/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

function App(): ReactElement {
  useConfirmTabClose();

  function renderContent(): ReactElement {
    return (
      <Switch>
        <Route exact path="/">
          <HomeProvider>
            <HomePage />
          </HomeProvider>
        </Route>
        <Route path="/workbench" component={WorkbenchModule} />
        <Route path="/specification" component={SpecModule} />
        <Route path="/response/:id" component={ResponseModule} />
        <Route exact path="/response" component={ResponsePage} />
        <Route path="/evaluation" component={Evaluation} />
        <Route
          path="/prefilledresponse/:id"
          component={PrefilledResponseModule}
        />
      </Switch>
    );
  }

  return (
    <div>
      <MsalProvider instance={msalInstance}>
        <CssBaseline />
        <AlertList />
        <div className={styles.App}>
          <Header />
          {renderContent()}
        </div>
      </MsalProvider>
    </div>
  );
}

export default App;
