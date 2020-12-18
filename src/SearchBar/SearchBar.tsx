import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Kravbank } from '../models/Kravbank';

import styles from './SearchBar.module.scss';

const displaylist = (list: Kravbank[]) => {
  return list.map((kravbank: Kravbank) => {
    if (kravbank.tittel) {
      return (
        <div className={styles.katalogitem} key={kravbank.id}>
          <p>{kravbank.tittel}</p>
          <Link to={'/edit/' + kravbank.id}>
            <button className={styles.editbutton} type="button">
              Rediger
            </button>
          </Link>
        </div>
      );
    } else {
      return null;
    }
  });
};

const SearchBar = (list: Kravbank[]) => {
  const [input, setInput] = useState('');
  const [searchList, setSearchList] = useState(list);

  const updateInput = async (input: any) => {
    const filtered = list.filter((element) => {
      return element.tittel.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setSearchList(filtered);
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
};

export default SearchBar;
