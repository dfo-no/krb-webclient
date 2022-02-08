import React from 'react';
import { makeStyles } from '@material-ui/core';
import theme from '../../theme';
import { TextField, InputAdornment } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { DFOSearchBarProps } from './DFOSearchBarProps';
import Utils from '../../common/Utils';

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: 'white',
    '& .MuiInputLabel-root': {
      color: '#BBBBBB',
      paddingLeft: 10
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.palette.black.main,
      textAlign: 'center',
      paddingLeft: 0
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: `2px solid ${theme.palette.indigo.main}`
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
    color: '#009FE3',
    fontSize: '30px !important'
  }
});

export default function DFOSearchBar({
  list,
  callback,
  searchFunction
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
      label={t('search for codelist')}
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
