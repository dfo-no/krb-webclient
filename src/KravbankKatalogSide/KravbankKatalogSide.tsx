import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SearchBar from '../SearchBar/SearchBar';
import styles from './KravbankKatalogSide.module.scss';
import { RootState } from '../store/configureStore';

function KravbankKatalogSide(this: any): ReactElement {
  const { kravbanker } = useSelector((state: RootState) => state.kravbank);

  const history = useHistory();
  const handleCreateNew = () => (event: any) => {
    history.push(`/kravbank/ny`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.newkatalogbutton}
        type="button"
        onClick={handleCreateNew()}
      >
        Opprett Kravbank
      </button>

      <div className={styles.katalogcontainer}></div>
      <SearchBar list={kravbanker}></SearchBar>
    </div>
  );
}

export default KravbankKatalogSide;
