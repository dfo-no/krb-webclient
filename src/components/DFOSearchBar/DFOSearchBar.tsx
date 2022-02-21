import React from 'react';
import { TextField, InputAdornment } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@material-ui/core';
import theme from '../../theme';
import { DFOSearchBarProps } from './DFOSearchBarProps';

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: theme.palette.dfoWhite.main
  },
  searchFieldIcon: {
    marginBottom: 2,
    color: theme.palette.purple.main,
    fontSize: '30px !important',
    zIndex: 1
  },
  noBorder: {
    border: 'none'
  }
});

export default function DFOSearchBar({
  list,
  callback,
  searchFunction,
  label
}: DFOSearchBarProps): React.ReactElement {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length !== 0) {
      callback(searchFunction(e.target.value, list));
    } else {
      callback(list);
    }
  };

  const classes = useStyles();

  return (
    <TextField
      variant="filled"
      label={label}
      className={classes.root}
      autoComplete="off"
      onChange={onChange}
      style={{ border: `2px solid ${theme.palette.indigo.main}` }}
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon className={classes.searchFieldIcon} />
          </InputAdornment>
        )
      }}
    />
  );
}
