import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import css from './Header.module.scss';

export default function Header(): ReactElement {
  const history = useHistory();
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
