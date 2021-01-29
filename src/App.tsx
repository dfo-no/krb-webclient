import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import styles from './App.module.scss';
import LoginForm from './LoginForm/LoginForm';
import Header from './Header/Header';
import HomePage from './Home/HomePage';
import BankPage from './Home/BankPage';
import { ProtectedRoute } from './authentication/ProtectedRoute';
import WorkbenchModule from './Workbench/WorkbenchModule';

function App(props: any) {
  return (
    <div className={styles.App}>
      <Header />
      <Switch>
        <Route exact path={'/'}>
          <HomePage></HomePage>
        </Route>
        <Route exact path={`/bank/:bankId`}>
          <BankPage></BankPage>
        </Route>
        <Route exact path={'/login'} component={LoginForm} />
        <ProtectedRoute
          path="/workbench"
          component={WorkbenchModule}
          {...props}
        />
      </Switch>
    </div>
  );
}

export default App;
