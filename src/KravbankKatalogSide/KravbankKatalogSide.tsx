import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { Kravbank } from '../models/Kravbank';
import { State } from '../store/index';
import SearchBar from '../SearchBar/SearchBar';
import styles from './KravbankKatalogSide.module.scss';
import { Katalog } from '../models/Katalog';

interface IProps {
  kravbanker: Katalog;
  editKravbank: any;
}

function KravbankKatalogSide(props: IProps): ReactElement {
  console.log(props.kravbanker);
  const maptoList = (katalog: Katalog) => {
    let newlist = [];
    for (let key in katalog) {
      let value = katalog[key];
      newlist.push(value);
      // Use `key` and `value`
    }
    return newlist;
  };

  const testing = maptoList(props.kravbanker);
  const history = useHistory();
  const handleCreateNew = () => (event: any) => {
    history.push(`/kravbank/ny`);
  };

  const handleEdit = (id: string) => (event: any) => {
    //const selectedKravbank = props.kravbanker.find((e) => e.id === id);
    const converted: number = +id;
    props.editKravbank(converted);
    history.push(`/edit/${id}`);
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

      <button
        className={styles.newkatalogbutton}
        type="button"
        onClick={handleEdit('0')}
      >
        Edit
      </button>
      <div className={styles.katalogcontainer}></div>
      <SearchBar list={testing}></SearchBar>
    </div>
  );
}

const editKravbank = (kravbankid: number) => ({
  type: '[KRAVBANK] EDIT',
  payload: kravbankid
});

const mapDispatchToProps = (dispatch: any) => {
  const actions = {
    editKravbank: (kravbankid: number) => dispatch(editKravbank(kravbankid))
  };
  return actions;
};

const mapStateToProps = (store: State) => {
  return { kravbanker: store.kravbanker };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KravbankKatalogSide);
