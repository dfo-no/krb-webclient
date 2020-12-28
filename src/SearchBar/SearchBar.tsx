import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { Katalog } from '../models/Katalog';
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

interface SearchBarProps {
  list: Kravbank[];
}

export default function SearchBar(props: SearchBarProps): ReactElement {
  const [input, setInput] = useState('');
  const [searchList, setSearchList] = useState(props.list);

  const updateInput = async (input: any) => {
    const filtered = props.list.filter((element) => {
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
}
