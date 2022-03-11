import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import theme from '../../theme';
import DFOTextField from '../DFOTextField/DFOTextField';

interface DFOSearchBarProps {
  list: object;
  searchFunction: any;
  callback: any;
  label: string;
}

const useStyles = makeStyles({
  searchFieldIcon: {
    marginBottom: 2,
    color: theme.palette.purple.main,
    fontSize: '30px !important',
    zIndex: 1
  },
  adornedEnd: {
    backgroundColor: theme.palette.dfoWhite.main
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

  return <DFOTextField />;
}
