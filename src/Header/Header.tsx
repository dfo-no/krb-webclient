import React, { ReactElement } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import SignedButton from '../SignedButton/SignedButton';
import css from './Header.module.scss';

export default function Header(): ReactElement {
  const history = useHistory();
  const { t } = useTranslation();
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
        <img alt="DFØ Logo" src="/logo-blue.svg" />
      </Navbar.Brand>
      {match && (
        <Button
          variant="outline-primary"
          onClick={() => {
            history.push('/workbench');
          }}
        >
          {t('all projects')}
        </Button>
      )}
      {process.env.NODE_ENV === 'development' && (
        <Badge bg="warning">dev</Badge>
      )}
      <div className={css.header__spacer} />

      <SignedButton />
    </Navbar>
  );
}
