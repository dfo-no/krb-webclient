import React, { ReactElement } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import css from './Header.module.scss';
import SignedButton from '../SignedButton/SignedButton';

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
      <div className={css.header__spacer} />

      <SignedButton />
    </Navbar>
  );
}
