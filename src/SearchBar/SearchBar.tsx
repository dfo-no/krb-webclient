import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Kravbank } from '../models/Kravbank';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  list: Kravbank[];
  editKravbank: any;
}

function SearchBar(props: SearchBarProps): ReactElement {
  const [input, setInput] = useState('');
  const [searchList, setSearchList] = useState(props.list);
  const history = useHistory();

  const updateInput = async (input: any) => {
    const filtered = props.list.filter((element) => {
      return element.tittel.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setSearchList(filtered);
  };

  const handleEdit = (id: number) => (event: any) => {
    //const selectedKravbank = props.kravbanker.find((e) => e.id === id);
    props.editKravbank(id);
    history.push(`/edit/${id}`);
  };

  const displaylist = (list: Kravbank[]) => {
    return list.map((kravbank: Kravbank) => {
      if (kravbank.tittel) {
        return (
          <div className={styles.katalogitem} key={kravbank.id}>
            <p>{kravbank.tittel}</p>
            <button
              className={styles.editbutton}
              type="button"
              onClick={handleEdit(kravbank.id)}
            >
              Rediger
            </button>
          </div>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div>
      <input
        className={styles.BarStyling}
        value={input}
        placeholder={'søk i katalog'}
        onChange={(e) => updateInput(e.target.value)}
      />
      <div>{displaylist(searchList)}</div>
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

export default connect(null, mapDispatchToProps)(SearchBar);
