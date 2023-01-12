import React, { ReactElement } from 'react';
import { CssBaseline } from '@mui/material';
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
import { Theme } from '@dfo-no/components.design.theme';
import { OidcConfiguration, OidcProvider } from '@axa-fr/react-oidc';

import AlertList from './components/Alert/AlertList';
import EvaluationModule from './pages/Evaluation/EvaluationModule';
import Header from './components/Header/Header';
import HomePage from './pages/Home/HomePage';
import PrefilledResponseModule from './pages/PrefilledResponse/PrefilledResponseModule';
import ResponseModule from './pages/Response/ResponseModule';
import SpecModule from './pages/SpecEditor/SpecModule';
import styles from './App.module.scss';
import WorkbenchModule from './pages/Workbench/WorkbenchModule';
import { HeaderContainer } from './components/Header/HeaderContext';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Footer from './Footer/Footer';
import {
  EVALUATION,
  PREFILLED_RESPONSE,
  RESPONSE,
  SPECIFICATION,
  WORKBENCH,
} from './common/PathConstants';
import { AlertsContainer } from './components/Alert/AlertContext';

const configuration: OidcConfiguration = {
  client_id: 'frontend', // Utils.ensure(process.env.REACT_APP_CLIENTID) //TODO: Oppdater i GitHub secrets. Kanskje fallback til frontend? Fiks feilmelding for den her...!
  redirect_uri: window.location.origin + '/authentication/callback',
  silent_redirect_uri:
    window.location.origin + '/authentication/silent-callback', // Optional activate silent-signin that use cookies between OIDC server and client javascript to restore the session
  scope: 'openid profile email',
  authority: 'https://krb-backend-auth.azurewebsites.net/realms/kravbank',
  service_worker_relative_url: '/OidcServiceWorker.js',
  service_worker_only: true,
};

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

function App(): ReactElement {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  function renderContent(): ReactElement {
    return (
      <AppInsightsContext.Provider value={reactPlugin}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path={`/${WORKBENCH}`} component={WorkbenchModule} />
          <Route path={`/${SPECIFICATION}`} component={SpecModule} />
          <Route path={`/${RESPONSE}/:responseId`} component={ResponseModule} />
          <Route path={`/${EVALUATION}`} component={EvaluationModule} />
          <Route
            path={`/${PREFILLED_RESPONSE}`}
            component={PrefilledResponseModule}
          />
        </Switch>
      </AppInsightsContext.Provider>
    );
  }

  return (
    <div>
      <OidcProvider configuration={configuration}>
        <Theme>
          <CssBaseline />
          <AlertsContainer.Provider>
            <AlertList />
            <HeaderContainer.Provider>
              <div className={styles.App}>
                <Header />
                <div className={styles.Content}>
                  <Breadcrumbs />
                  {renderContent()}
                </div>
                {isHomePage && <Footer />}
              </div>
            </HeaderContainer.Provider>
          </AlertsContainer.Provider>
        </Theme>
      </OidcProvider>
    </div>
  );
}

export default App;
