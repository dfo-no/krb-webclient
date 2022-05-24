import React from 'react';
import styles from './App.module.scss';
import { CssBaseline } from '@mui/material';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { Route, Switch } from 'react-router-dom';

import AlertList from './components/Alert/AlertList';
import Evaluation from './Evaluation/Evaluation';
import Header from './components/Header/Header';
import HomePage from './pages/Home/HomePage';
import PrefilledResponseModule from './PrefilledResponseEditor/PrefilledResponseModule';
import ResponseModule from './ResponseEditor/ResponseModule';
import ResponsePage from './ResponseEditor/ResponsePage';
import SpecModule from './pages/SpecEditor/SpecModule';
import useConfirmTabClose from './hooks/useConfirmTabClose';
import WorkbenchModule from './Workbench/WorkbenchModule';
import { BankProvider } from './components/BankContext/BankContext';
import { msalConfig } from './authentication/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

function App(): React.ReactElement {
  useConfirmTabClose();

  function renderContent() {
    return (
      <Switch>
        <Route exact path="/">
          <BankProvider>
            <HomePage />
          </BankProvider>
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
