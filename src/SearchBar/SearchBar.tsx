import React, { ReactElement, useState } from 'react';
import { ListGroup, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Bank } from '../models/Bank';
import { selectBank } from '../store/reducers/kravbank-reducer';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  list: Bank[];
}

export default function SearchBar(props: SearchBarProps): ReactElement {
  const [input, setInput] = useState('');
  const [searchList, setSearchList] = useState<Bank[]>([]);
  const dispatch = useDispatch();

  const updateSearchText = async (input: any) => {
    if (input === '' || input === ' ') {
      setSearchList([]);
    } else {
      const filtered = props.list.filter((element) => {
        return element.title.toLowerCase().includes(input.toLowerCase());
      });
      setSearchList(filtered.slice(0, 5));
    }
    setInput(input);
  };

  const handleEdit = (bank: Bank) => () => {
    dispatch(selectBank(bank));
  };

  const displaylist = (list: Bank[]) => {
    const bankList = list.map((bank: Bank) => {
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
        {bankList}
      </ListGroup>
    );
  };

  return (
    <>
      <FormControl
        value={input}
        placeholder={'search projects'}
        onChange={(e) => updateSearchText(e.target.value)}
      />
      {displaylist(searchList)}
    </>
  );
}
