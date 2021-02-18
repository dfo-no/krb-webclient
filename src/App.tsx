/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import styles from './App.module.scss';
import LoginForm from './LoginForm/LoginForm';
import Header from './Header/Header';
import HomePage from './Home/HomePage';
import BankPage from './Home/BankPage';
import ProtectedRoute from './authentication/ProtectedRoute';
import WorkbenchModule from './Workbench/WorkbenchModule';
import ResponseEditor from './ResponseEditor/ResponseEditor';
import SpecEditor from './SpecEditor/SpecEditor';
import Evaluation from './Evaluation/Evaluation';

console.log(process.env);

function App(): ReactElement {
  return (
    <div className={styles.App}>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/bank/:bankId">
          <BankPage />
        </Route>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute path="/workbench" component={WorkbenchModule} />
        <ProtectedRoute path="/speceditor/:id" component={SpecEditor} />
        <ProtectedRoute path="/responseeditor" component={ResponseEditor} />
        <ProtectedRoute path="/evaluation" component={Evaluation} />
      </Switch>
    </div>
  );
}

export default App;
