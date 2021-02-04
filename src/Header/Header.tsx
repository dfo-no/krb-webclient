import React, { ReactElement } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Dropdown } from 'react-bootstrap';
import css from './Header.module.scss';
import { fakeAuth } from '../authentication/AuthenticationHandler';
import {
  BsBoxArrowRight,
  BsFillPersonFill,
  BsFillPersonLinesFill
} from 'react-icons/bs';

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

  return (
    <Navbar bg="light" variant="dark" className={css.header}>
      <Navbar.Brand onClick={home} role="link" className={css.header__brand}>
        <img alt={'DFØ Logo'} src="/logo-blue.svg" />{' '}
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
      <div className={css.header__spacer}></div>

      {fakeAuth.isAuthenticated() && (
        <Dropdown drop="left">
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            <BsFillPersonFill></BsFillPersonFill>&nbsp;&nbsp;
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item disabled={true}>
              <BsFillPersonLinesFill></BsFillPersonLinesFill>
              <span>&nbsp;&nbsp;My page</span>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                fakeAuth.signout(() => history.push('/'));
              }}
            >
              <BsBoxArrowRight></BsBoxArrowRight>
              <span>&nbsp;&nbsp;Log out</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </Navbar>
  );
}
