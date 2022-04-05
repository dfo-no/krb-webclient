import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import theme from '../../theme';
import DFOInput from '../DFOInput/DFOInput';

interface DFOSearchBarProps {
  list: object;
  searchFunction: (searchString: any, list: any) => void;
  callback: any;
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

export default function DFOSearchBar({
  list,
  callback,
  searchFunction,
  placeholder
}: DFOSearchBarProps): React.ReactElement {
  console.log(typeof list);

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
