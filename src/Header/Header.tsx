import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import css from './Header.module.scss';
import { fakeAuth } from '../authentication/AuthenticationHandler';

export default function Header(): ReactElement {
  const history = useHistory();
  const home = (): void => {
    history.push('/');
  };

  return (
    <Navbar bg="light" variant="dark" className={css.header}>
      <Navbar.Brand onClick={home} role="link" className={css.header__brand}>
        <img alt={'DFØ Logo'} src="/logo-blue.svg" />{' '}
      </Navbar.Brand>
      <div className={css.header__spacer}></div>
      <Button
        variant="primary"
        onClick={() => {
          fakeAuth.signout(() => history.push('/'));
        }}
      >
        <i className="bi bi-person-fill"></i>&nbsp;Log out
      </Button>
    </Navbar>
  );
}
