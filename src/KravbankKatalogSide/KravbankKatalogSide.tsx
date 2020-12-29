import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { Kravbank } from '../models/Kravbank';
import { Katalog } from '../models/Katalog';
import { State } from '../store/index';
import SearchBar from '../SearchBar/SearchBar';
import styles from './KravbankKatalogSide.module.scss';

interface IProps {
  kravbanker: Katalog<Kravbank>;
}

function KravbankKatalogSide(props: IProps): ReactElement {
  const maptoList = (katalog: Katalog<Kravbank>) => {
    let list = [];
    for (let key in katalog) {
      let value = katalog[key];
      list.push(value);
    }
    return list;
  };

  const kravbankListe = maptoList(props.kravbanker);
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
      <SearchBar list={kravbankListe}></SearchBar>
    </div>
  );
}

//TODO: find better solution for edit-possibility in combination with search
const mapStateToProps = (store: State) => {
  return { kravbanker: store.kravbanker };
};

export default connect(mapStateToProps)(KravbankKatalogSide);
