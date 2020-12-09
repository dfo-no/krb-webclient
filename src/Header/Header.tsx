import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';

import css from './Header.module.scss';

export default function Header(): ReactElement {
  const history = useHistory();
  const { t } = useTranslation('translations');

  const home = (): void => {
    history.push('/');
  };

  return (
    <header className={css.Header}>
      <div className={css.brand} onClick={home}>
        <img src={'/logo-blue.svg'} alt={'DFØ Logo'} />
      </div>
    </header>
  );
}