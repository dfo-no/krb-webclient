import dayjs from 'dayjs';
import React, { ReactElement } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Bank } from '../../models/Bank';
import { selectBank } from '../../store/reducers/kravbank-reducer';

interface FilteredListProps {
  list: Bank[];
  filterTitle: string;
  filterType: string;
}

export default function FilteredList(props: FilteredListProps): ReactElement {
  const dispatch = useDispatch();

  const handleEdit = (bank: Bank) => () => {
    dispatch(selectBank(bank));
  };

  let list: Bank[] = [];
  if (props.filterType === 'date') {
    list = props.list
      .slice()
      .sort((a, b) =>
        dayjs(a.publishedDate).isBefore(dayjs(b.publishedDate)) ? 1 : -1
      );
  }
  if (props.filterType === 'alphabetic') {
    list = props.list
      .slice()
      .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
  }
  //TODO: correct link to other page than workbench when site exist.
  //TODO: Discuss suitable amount of elements displayed
  const filteredElements = list.slice(0, 5).map((element: Bank) => {
    return (
      <ListGroup.Item>
        <Link to={`/bank/${element.id}`} onClick={handleEdit(element)}>
          {element.title}
        </Link>
      </ListGroup.Item>
    );
  });
  return (
    <ListGroup variant="flush">
      <h5>{props.filterTitle}</h5>
      {filteredElements}
    </ListGroup>
  );
}
