import React, { ReactElement, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Bank } from '../models/Bank';
import { selectProject } from '../store/reducers/kravbank-reducer';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  list: Bank[];
}

export default function SearchBar(props: SearchBarProps): ReactElement {
  const [input, setInput] = useState('');
  const [searchList, setSearchList] = useState(props.list);
  const dispatch = useDispatch();

  const updateSearchText = async (input: any) => {
    const filtered = props.list.filter((element) => {
      return element.title.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setSearchList(filtered);
  };

  const handleEdit = (bank: Bank) => () => {
    dispatch(selectProject(bank));
  };

  const displaylist = (list: Bank[]) => {
    const jsx = list.map((bank: Bank) => {
      return (
        <ListGroup.Item key={bank.id} className={styles.katalogitem}>
          <Link to={`/workbench/${bank.id}`} onClick={handleEdit(bank)}>
            {bank.title}
          </Link>
        </ListGroup.Item>
      );
    });
    return <ListGroup>{jsx}</ListGroup>;
  };

  return (
    <>
      <input
        className={styles.BarStyling}
        value={input}
        placeholder={'search projects'}
        onChange={(e) => updateSearchText(e.target.value)}
      />
      {displaylist(searchList)}
    </>
  );
}
