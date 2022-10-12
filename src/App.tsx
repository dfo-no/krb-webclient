import React, { ReactElement } from 'react';
import { CssBaseline } from '@mui/material';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { Route, Switch } from 'react-router-dom';

import AlertList from './components/Alert/AlertList';
import EvaluationModule from './pages/Evaluation/EvaluationModule';
import Header from './components/Header/Header';
import HomePage from './pages/Home/HomePage';
import PrefilledResponseModule from './pages/PrefilledResponse/PrefilledResponseModule';
import ResponseModule from './pages/Response/ResponseModule';
import SpecModule from './pages/SpecEditor/SpecModule';
import styles from './App.module.scss';
import useConfirmTabClose from './hooks/useConfirmTabClose';
import WorkbenchModule from './pages/Workbench/WorkbenchModule';
import { HeaderProvider } from './components/Header/HeaderContext';
import { msalConfig } from './authentication/authConfig';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Footer from './Footer/Footer';

const msalInstance = new PublicClientApplication(msalConfig);

function App(): ReactElement {
  useConfirmTabClose();

  function renderContent(): ReactElement {
    return (
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/workbench" component={WorkbenchModule} />
        <Route path="/specification" component={SpecModule} />
        <Route path="/response" component={ResponseModule} />
        <Route path="/evaluation" component={EvaluationModule} />
        <Route path="/prefilledresponse" component={PrefilledResponseModule} />
      </Switch>
    );
  }

  return (
    <div>
      <MsalProvider instance={msalInstance}>
        <CssBaseline />
        <AlertList />
        <HeaderProvider>
          <div className={styles.App}>
            <Header />
            <div className={styles.Content}>
              <Breadcrumbs />
              {renderContent()}
            </div>
            <Footer />
          </div>
        </HeaderProvider>
      </MsalProvider>
    </div>
  );
}

export default App;
