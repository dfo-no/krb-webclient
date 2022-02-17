import React from 'react';
import { TextField, InputAdornment } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@material-ui/core';
import theme from '../../theme';
import { DFOSearchBarProps } from './DFOSearchBarProps';

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: 'white',
    '& .MuiInputBase-adornedEnd': {
      backgroundColor: 'white',
      '&:hover': {
        background: theme.palette.dfoWhite.main
      }
    }
  },
  searchFieldIcon: {
    marginBottom: 2,
    color: theme.palette.purple.main,
    fontSize: '30px !important',
    zIndex: 1
  },
  adornedEnd: {
    backgroundColor: 'white'
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
      callback([]);
    }
  };

  const classes = useStyles();

  return (
    <TextField
      variant="filled"
      size="small"
      label={label}
      className={classes.root}
      autoComplete="off"
      onChange={onChange}
      style={{
        border: `2px solid ${theme.palette.indigo.main}`
      }}
      InputProps={{
        disableUnderline: true,
        classes: {
          adornedEnd: classes.adornedEnd
        },
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon className={classes.searchFieldIcon} />
          </InputAdornment>
        )
      }}
    />
  );
}
