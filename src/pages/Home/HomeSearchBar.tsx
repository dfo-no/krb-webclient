import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IBank } from '../../Nexus/entities/IBank';
import { useBankState } from '../../components/BankContext/BankContext';

interface IProps {
  list: IBank[];
}

interface ILabel {
  label: string;
  value: string;
}

export default function HomeSearchBar({ list }: IProps): React.ReactElement {
  const { setSelectedBank } = useBankState();

  const { t } = useTranslation();

  const bankMap: Map<string, IBank> = new Map<string, IBank>();
  const displayList: ILabel[] = list.map((item) => {
    bankMap.set(item.id, item);
    return { label: item.title, value: item.id };
  });

  const onValueSelected = (newValue: ILabel | null): void => {
    if (newValue) {
      const selectedBank = bankMap.get(newValue.value);
      if (selectedBank) {
        setSelectedBank(selectedBank);
      }
    }
  };

  return (
    <Autocomplete
      options={displayList}
      disablePortal={true}
      onChange={(event, newValue) => onValueSelected(newValue)}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      renderInput={(params) => (
        <TextField {...params} label={t('search for banks')} />
      )}
    />
  );
}
