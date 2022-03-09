import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IBank } from '../../Nexus/entities/IBank';
import { useAppDispatch } from '../../store/hooks';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import { setBank } from '../../store/reducers/spesification-reducer';

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
    dispatch(setBank(bank));
  };

  // TODO: correct link to other page than workbench when site exist.
  // TODO: Discuss suitable amount of elements displayed
  const filteredElements = () => {
    return list.map((bank: IBank) => {
      return (
        <div key={bank.id}>
          <ListItem>
            <Link to="/specification" onClick={handleSelectedBank(bank)}>
              {bank.title}
            </Link>
            {bank.publishedDate && (
              <Typography variant="subtitle1" sx={{ mx: 2 }}>
                {t('date.ago', { date: new Date(bank.publishedDate) })}
              </Typography>
            )}
          </ListItem>
          <Divider component="li" />
        </div>
      );
    });
  };

  return (
    <>
      <h5>{filterTitle}</h5>
      <List>{filteredElements()}</List>
    </>
  );
}
