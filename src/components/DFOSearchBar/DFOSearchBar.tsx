import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

import DFOInput from '../DFOTextField/DFOTextField';
import theme from '../../theme';
import { IBaseModel } from '../../Nexus/entities/IBaseModel';

interface DFOSearchBarProps<T extends IBaseModel> {
  list: T[];
  searchFunction: (searchString: string, list: T[]) => T[];
  callback: (list: T[]) => void;
  placeholder: string;
}

const useStyles = makeStyles({
  searchFieldIcon: {
    marginBottom: 2,
    marginRight: 10,
    color: theme.palette.secondary.main,
    zIndex: 1,
  },
  adornedEnd: {
    backgroundColor: theme.palette.white.main,
  },
});

export default function DFOSearchBar<T extends IBaseModel>({
  list,
  callback,
  searchFunction,
  placeholder,
}: DFOSearchBarProps<T>): React.ReactElement {
  const classes = useStyles();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length !== 0) {
      callback(searchFunction(e.target.value, list));
    } else {
      callback(list);
    }
  };

  return (
    <DFOInput
      placeholder={placeholder}
      onChange={onChange}
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon className={classes.searchFieldIcon} />
        </InputAdornment>
      }
      disableUnderline
    />
  );
}
