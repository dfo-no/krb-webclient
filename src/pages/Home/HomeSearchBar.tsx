import Autocomplete from '@mui/material/Autocomplete';
import makeStyles from '@mui/styles/makeStyles';
import React, { Dispatch, SetStateAction } from 'react';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

import { IBank } from '../../Nexus/entities/IBank';

interface IProps {
  list: IBank[];
  setSelectedBank: Dispatch<SetStateAction<IBank | null>>;
}

interface ILabel {
  label: string;
  value: string;
}

const useStyles = makeStyles({
  autocomplete: {
    background: 'var(--input-background-color)',
  },
});

const HomeSearchBar = ({
  list,
  setSelectedBank,
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const classes = useStyles();

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
      className={classes.autocomplete}
      options={displayList}
      renderOption={(props, option) => (
        <li {...props} key={option.value}>
          {option.label}
        </li>
      )}
      disablePortal={true}
      onChange={(event, newValue) => onValueSelected(newValue)}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      renderInput={(params) => (
        <TextField {...params} label={t('common.Search for banks')} />
      )}
    />
  );
};

export default HomeSearchBar;
