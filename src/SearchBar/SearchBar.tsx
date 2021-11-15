import React, { useState } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IBank } from '../Nexus/entities/IBank';
import { useAppDispatch } from '../store/hooks';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import styles from './SearchBar.module.scss';

interface ISearchBarProps {
  list: IBank[];
}

export default function SearchBar({
  list
}: ISearchBarProps): React.ReactElement {
  const [input, setInput] = useState('');
  const [searchList, setSearchList] = useState<IBank[]>([]);
  const dispatch = useAppDispatch();
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

  const handleEdit = (bank: IBank) => () => {
    dispatch(selectBank(bank.id));
  };

  const displaylist = (bankList: IBank[]) => {
    const resultList = bankList.map((bank: IBank) => {
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
