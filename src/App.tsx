import React from 'react';
import styles from './App.module.scss';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import KravbankSide from './KravbankSide/KravbankSide';
import Header from './Header/Header';
import EditorSide from './EditorSide/EditorSide';
import KravbankKatalogSide from './KravbankKatalogSide/KravbankKatalogSide';
import NyKravbankSide from './NyKravbankSide/NyKravbankSide';

function App() {
  return (
    <div className={styles.App}>
      <Router>
       <Header />
        <Switch>
          <Route exact path={'/'}>
            <RegistrationForm />
          </Route>  
          <Route exact path={'/katalog'}>
            <KravbankKatalogSide />
          </Route>
          <Route exact path={'/edit/:id'}>
            <EditorSide />
          </Route>    
          <Route exact path={'/kravbank'}>
            <KravbankSide />
          </Route>  
          <Route exact path={'/kravbank/ny'}>
            <NyKravbankSide />
          </Route>  
        </Switch>
      </Router>
      </div>

  );
}

export default App;
