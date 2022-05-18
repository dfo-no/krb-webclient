import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { IBank } from '../Nexus/entities/IBank';
import { useAppDispatch } from '../store/hooks';
import { selectBank } from '../store/reducers/selectedBank-reducer';

interface IProps {
  list: Record<string, IBank>;
}

interface ILabel {
  label: string;
  value: string;
}

export default function SearchBar({ list }: IProps): React.ReactElement {
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const displayList: ILabel[] = [];
  Object.values(list).forEach((item, i) => {
    displayList[i] = { label: item.title, value: item.id };
  });

  const uniqueValuesSet = new Set();
  const filteredArr: ILabel[] = displayList.filter((obj) => {
    // check if name property value is already in the set
    const isPresentInSet = uniqueValuesSet.has(obj.label);

    // add name property value to Set
    uniqueValuesSet.add(obj.label);
    return !isPresentInSet;
  });

  return (
    <Autocomplete
      options={filteredArr}
      disablePortal={true}
      onChange={(event, newValue) => {
        if (newValue) {
          dispatch(selectBank(newValue.value));
          history.push(`/specification/${newValue.value}`);
        }
      }}
      renderInput={(params) => (
        <TextField {...params} label={t('Search for banks')} />
      )}
    />
  );
}
