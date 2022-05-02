import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { IBaseModel } from '../../Nexus/entities/IBaseModel';
import theme from '../../theme';
import DFOInput from '../DFOTextField/DFOTextField';

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
    fontSize: '30px !important',
    zIndex: 1
  },
  adornedEnd: {
    backgroundColor: theme.palette.white.main
  }
});

export default function DFOSearchBar<T extends IBaseModel>({
  list,
  callback,
  searchFunction,
  placeholder
}: DFOSearchBarProps<T>): React.ReactElement {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length !== 0) {
      callback(searchFunction(e.target.value, list));
    } else {
      callback(list);
    }
  };

  const classes = useStyles();

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
