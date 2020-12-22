import React, { ReactElement } from 'react';
import styles from './KravbankKatalogSide.module.scss';
import { useHistory } from 'react-router-dom';
import { State } from '../store/index';
import { Kravbank } from '../models/Kravbank';
import SearchBar from '../SearchBar/SearchBar';
import { connect } from 'react-redux';

interface IProps {
  kravbanker: Kravbank[];
}

function KravbankKatalogSide(props: IProps): ReactElement {
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
      <SearchBar list={props.kravbanker}></SearchBar>
    </div>
  );
}

const mapStateToProps = (store: State) => {
  return { kravbanker: store.kravbanker };
};

export default connect(mapStateToProps)(KravbankKatalogSide);
