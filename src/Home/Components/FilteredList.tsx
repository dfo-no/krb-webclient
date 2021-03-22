import dayjs from 'dayjs';
import React, { ReactElement } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Bank } from '../../models/Bank';
import { selectBank } from '../../store/reducers/selectedBank-reducer';

interface FilteredListProps {
  list: Bank[];
  filterTitle: string;
  filterType: string;
}

export default function FilteredList({
  list,
  filterTitle,
  filterType
}: FilteredListProps): ReactElement {
  const dispatch = useDispatch();

  const handleSelectedBank = (bank: Bank) => () => {
    dispatch(selectBank(bank.id));
  };

  let bankList: Bank[] = [];
  if (filterType === 'date') {
    bankList = list
      .slice()
      .sort((a, b) =>
        dayjs(a.publishedDate).isBefore(dayjs(b.publishedDate)) ? 1 : -1
      );
  }
  if (filterType === 'alphabetic') {
    bankList = list
      .slice()
      .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
  }
  // TODO: correct link to other page than workbench when site exist.
  // TODO: Discuss suitable amount of elements displayed
  const filteredElements = bankList.slice(0, 5).map((bank: Bank) => {
    return (
      <ListGroup.Item key={bank.id}>
        <Link to={`/bank/${bank.id}`} onClick={handleSelectedBank(bank)}>
          {bank.title}
        </Link>
      </ListGroup.Item>
    );
  });
  return (
    <ListGroup variant="flush">
      <h5>{filterTitle}</h5>
      {filteredElements}
    </ListGroup>
  );
}
