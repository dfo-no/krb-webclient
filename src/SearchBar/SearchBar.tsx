import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IBank } from '../Nexus/entities/IBank';
import { useBankState } from '../Home/Components/BankContext';

interface IProps {
  list: Record<string, IBank>;
}

interface ILabel {
  label: string;
  value: string;
}

export default function SearchBar({ list }: IProps): React.ReactElement {
  const { setSelectedBank } = useBankState();

  const { t } = useTranslation();

  const uniqueValuesSet = new Set();
  const bankMap: Map<string, IBank> = new Map<string, IBank>();
  const displayList: ILabel[] = Object.values(list)
    .map((item) => {
      bankMap.set(item.id, item);
      return { label: item.title, value: item.id };
    })
    .filter((obj) => {
      // check if name property value is already in the set
      const isPresentInSet = uniqueValuesSet.has(obj.label);
      // add name property value to Set
      uniqueValuesSet.add(obj.label);
      return !isPresentInSet;
    });

  return (
    <Autocomplete
      options={displayList}
      disablePortal={true}
      onChange={(event, newValue) => {
        if (newValue) {
          const selectedBank = bankMap.get(newValue.value);
          if (selectedBank) {
            setSelectedBank(selectedBank);
          }
        }
      }}
      isOptionEqualToValue={(option, value) => {
        return option.label === value.label;
      }}
      renderInput={(params) => (
        <TextField {...params} label={t('search for banks')} />
      )}
    />
  );
}
