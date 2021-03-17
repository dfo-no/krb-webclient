import React, { ReactElement } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Dropdown } from 'react-bootstrap';
import {
  BsBoxArrowRight,
  BsFillPersonFill,
  BsFillPersonLinesFill
} from 'react-icons/bs';

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from '@azure/msal-react';

import { loginRequest } from '../authentication/authConfig';
import css from './Header.module.scss';

export default function Header(): ReactElement {
  const history = useHistory();
  const home = (): void => {
    history.push('/');
  };

  const match = useRouteMatch({
    path: '/workbench/:projectId',
    strict: false,
    sensitive: true
  });

  const SignInSignOutButton = () => {
    const { instance } = useMsal();
    return (
      <>
        <AuthenticatedTemplate>
          <Button
            variant="secondary"
            onClick={() => instance.logout()}
            className="ml-auto"
          >
            Sign Out
          </Button>
        </AuthenticatedTemplate>
      </>
    );
  };

  return (
    <Navbar bg="light" variant="dark" className={css.header}>
      <Navbar.Brand onClick={home} role="link" className={css.header__brand}>
        <img alt="DFØ Logo" src="/logo-blue.svg" />
      </Navbar.Brand>
      {match && (
        <Button
          variant="outline-primary"
          onClick={() => {
            history.push('/workbench');
          }}
        >
          All projects
        </Button>
      )}
      <div className={css.header__spacer} />

      <SignInSignOutButton />
    </Navbar>
  );
}
