import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IBank } from '../../Nexus/entities/IBank';
import { useAppDispatch } from '../../store/hooks';
import { selectBank } from '../../store/reducers/selectedBank-reducer';

interface IFilteredListProps {
  list: IBank[];
  filterTitle: string;
}

export default function FilteredList({
  list,
  filterTitle
}: IFilteredListProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleSelectedBank = (bank: IBank) => () => {
    dispatch(selectBank(bank.id));
  };

  // TODO: correct link to other page than workbench when site exist.
  // TODO: Discuss suitable amount of elements displayed
  const filteredElements = () => {
    return list.map((bank: IBank) => {
      return (
        <ListGroup.Item key={bank.id}>
          <Link to="/specification" onClick={handleSelectedBank(bank)}>
            {bank.title}
          </Link>
          {bank.publishedDate && (
            <small className="mx-2 text-muted">
              {t('date.ago', { date: new Date(bank.publishedDate) })}
            </small>
          )}
        </ListGroup.Item>
      );
    });
  };
  return (
    <ListGroup variant="flush">
      <h5>{filterTitle}</h5>
      {filteredElements()}
    </ListGroup>
  );
}
