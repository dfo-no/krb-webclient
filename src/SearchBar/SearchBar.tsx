import React, { ReactElement, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { Bank } from '../models/Bank';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  list: Bank[];
}

export default function SearchBar({ list }: SearchBarProps): ReactElement {
  const [input, setInput] = useState('');
  const [searchList, setSearchList] = useState<Bank[]>([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const updateSearchText = async (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { value } = event.target;
    if (value === '' || value === ' ') {
      setSearchList([]);
    } else {
      const filtered = list.filter((element) => {
        return element.title.toLowerCase().includes(value.toLowerCase());
      });
      setSearchList(filtered.slice(0, 5));
    }
    setInput(value);
  };

  const handleEdit = (bank: Bank) => () => {
    dispatch(selectBank(bank.id));
  };

  const displaylist = (bankList: Bank[]) => {
    const resultList = bankList.map((bank: Bank) => {
      return (
        <ListGroup.Item key={bank.id} className={styles.katalogitem}>
          <Link to={`/bank/${bank.id}`} onClick={handleEdit(bank)}>
            {bank.title}
          </Link>
        </ListGroup.Item>
      );
    });
    return (
      <ListGroup className={styles.searchResults} variant="flush">
        {resultList}
      </ListGroup>
    );
  };

  return (
    <>
      <FormControl
        value={input}
        type="text"
        placeholder={t('search banks')}
        onChange={(e) => updateSearchText(e)}
      />
      {displaylist(searchList)}
    </>
  );
}
