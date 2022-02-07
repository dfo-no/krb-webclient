import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import theme from '../../../theme';
import { TextField, InputAdornment } from '@mui/material/';
import Utils from '../../../common/Utils';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { Parentable } from '../../../models/Parentable';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

interface IProps {
  list: Parentable<IProduct>[];
  callback: (result: IProduct[]) => void;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    backgroundColor: 'white',
    '& .MuiInputLabel-root': {
      color: theme.palette.black.main
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.palette.black.main,
      textAlign: 'center'
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
    display: 'flex',
    alignSelf: 'center'
  }
});

export default function CodeListSearchBar({
  list,
  callback
}: IProps): React.ReactElement {
  const [searchFieldValue, setSearchFieldValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFieldValue(e.target.value);
  };

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (searchFieldValue.length !== 0) {
      }
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
      onKeyUp={onKeyUp}
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
