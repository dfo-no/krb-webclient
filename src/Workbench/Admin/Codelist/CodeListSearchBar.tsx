import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import theme from '../../../theme';
import { TextField, InputAdornment } from '@mui/material/';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

interface IProps {
  list: ICodelist[];
  callback: (result: ICodelist[]) => void;
}

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

export default function CodeListSearchBar({
  list,
  callback
}: IProps): React.ReactElement {
  let newCodeListHierarchy: ICodelist[] = [];

  const performSearch = (searchString: string) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].title.toLowerCase().includes(searchString.toLowerCase())) {
        newCodeListHierarchy.push(list[i]);
        callback(newCodeListHierarchy);
      }

      for (let j = 0; j < list[i].codes.length; j++) {
        if (
          list[i].codes[j].title
            .toLowerCase()
            .includes(searchString.toLowerCase())
        ) {
          const parent = {
            description: list[i].description,
            codes: [list[i].codes[j]],
            id: list[i].id,
            title: list[i].title,
            sourceOriginal: list[i].sourceOriginal,
            sourceRel: list[i].sourceOriginal,
            type: list[i].type
          };
          newCodeListHierarchy.push(parent);
          callback(newCodeListHierarchy);
        }
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    newCodeListHierarchy = [];
    if (e.target.value.length !== 0) {
      performSearch(e.target.value);
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
