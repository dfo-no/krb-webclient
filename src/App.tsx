import React, { ReactElement } from 'react';
import { CssBaseline } from '@mui/material';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { Route, Switch, useLocation } from 'react-router-dom';
import {
  ApplicationInsights,
  ITelemetryItem,
} from '@microsoft/applicationinsights-web';
import {
  AppInsightsContext,
  ReactPlugin,
} from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from 'history';

import AlertList from './components/Alert/AlertList';
import EvaluationModule from './pages/Evaluation/EvaluationModule';
import Header from './components/Header/Header';
import HomePage from './pages/Home/HomePage';
import PrefilledResponseModule from './pages/PrefilledResponse/PrefilledResponseModule';
import ResponseModule from './pages/Response/ResponseModule';
import SpecModule from './pages/SpecEditor/SpecModule';
import styles from './App.module.scss';
import WorkbenchModule from './pages/Workbench/WorkbenchModule';
import { HeaderProvider } from './components/Header/HeaderContext';
import { msalConfig } from './authentication/authConfig';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Footer from './Footer/Footer';
import { ResponseProvider } from './pages/Response/ResponseContext';
import {
  EVALUATION,
  PREFILLED_RESPONSE,
  RESPONSE,
  SPECIFICATION,
  WORKBENCH,
} from './common/PathConstants';

const browserHistory = createBrowserHistory();
const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
  config: {
    connectionString:
      process.env.REACT_APP_APPLICATION_INSIGHTS_CONNECTION_STRING,
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory },
    },
    disableFetchTracking: true,
  },
});
appInsights.loadAppInsights();

appInsights.addTelemetryInitializer((env: ITelemetryItem) => {
  // eslint-disable-next-line no-param-reassign
  env.tags = env.tags || [];

  // Default is krb-webclient. I don't know where Application Insights get it from, so I'll leave this here as an
  // example for now.

  // eslint-disable-next-line no-param-reassign
  // env.tags['ai.cloud.role'] = 'krb-webclient';

  // eslint-disable-next-line no-param-reassign
  env.data = env.data || [];
  // eslint-disable-next-line no-param-reassign
  env.data.environment = process.env.REACT_APP_APPLICATION_INSIGHTS_ENVIRONMENT;
});

const msalInstance = new PublicClientApplication(msalConfig);

function App(): ReactElement {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  function renderContent(): ReactElement {
    return (
      <AppInsightsContext.Provider value={reactPlugin}>
        {/* TODO: Narrow down to only response module */}
        <ResponseProvider>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path={`/${WORKBENCH}`} component={WorkbenchModule} />
            <Route path={`/${SPECIFICATION}`} component={SpecModule} />
            <Route path={`/${RESPONSE}`} component={ResponseModule} />
            <Route path={`/${EVALUATION}`} component={EvaluationModule} />
            <Route
              path={`/${PREFILLED_RESPONSE}`}
              component={PrefilledResponseModule}
            />
          </Switch>
        </ResponseProvider>
      </AppInsightsContext.Provider>
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
            {isHomePage && <Footer />}
          </div>
        </HeaderProvider>
      </MsalProvider>
    </div>
  );
}

export default App;
