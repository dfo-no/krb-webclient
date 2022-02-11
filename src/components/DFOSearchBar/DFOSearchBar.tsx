import React from 'react';
import { TextField, InputAdornment } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@material-ui/core';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';
import { DFOSearchBarProps } from './DFOSearchBarProps';

const useStyles = makeStyles({
  root: {
    width: '100%',
    '& .MuiInputLabel-root': {
      color: theme.palette.silver.main,
      paddingLeft: 10
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.palette.black.main,
      paddingLeft: 0,
      paddingRight: 0
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: `2px solid ${theme.palette.indigo.main}`,
        backgroundColor: theme.palette.dfoWhite.main
      },
      '&:hover fieldset': {
        border: `3px solid ${theme.palette.indigo.main}`
      },
      '&.Mui-focused fieldset': {
        border: `3px solid ${theme.palette.indigo.main}`
      }
    }
  },
  searchFieldIcon: {
    marginBottom: 2,
    color: theme.palette.purple.main,
    fontSize: '30px !important',
    zIndex: 1
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

  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <TextField
      variant="outlined"
      label={label}
      className={classes.root}
      autoComplete="off"
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon className={classes.searchFieldIcon} />
          </InputAdornment>
        )
      }}
    />
  );
}
