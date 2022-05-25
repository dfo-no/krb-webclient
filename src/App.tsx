import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { CssBaseline } from '@mui/material';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import { msalConfig } from './authentication/authConfig';
import AlertList from './components/Alert/AlertList';
import Header from './components/Header/Header';
import Evaluation from './Evaluation/Evaluation';
import HomePage from './pages/Home/HomePage';
import useConfirmTabClose from './hooks/useConfirmTabClose';
import PrefilledResponseModule from './PrefilledResponseEditor/PrefilledResponseModule';
import ResponseModule from './pages/Response/ResponseModule';
import ResponsePage from './pages/Response/ResponsePage';
import SpecModule from './SpecEditor/SpecModule';
import WorkbenchModule from './Workbench/WorkbenchModule';
import { BankProvider } from './components/BankContext/BankContext';

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
