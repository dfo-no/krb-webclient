import React from 'react';
import styles from './App.module.scss';
import { useTranslation } from 'react-i18next';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import KravbankSide from './KravbankSide/KravbankSide';
import Header from './Header/Header';



function App() {
  const { t } = useTranslation('translations');

  return (
    <div className={styles.App}>
      <Router>
       <Header />
        <Switch>
          <Route exact path={'/'}>
            <RegistrationForm />
          </Route>  
          <Route exact path={'/kravbank'}>
            <KravbankSide />
          </Route>  
        </Switch>
      </Router>
    </div>
  );
}

export default App;
