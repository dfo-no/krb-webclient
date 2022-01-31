import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import theme from '../../../theme';
import TextField from '@mui/material/TextField';
import { ListTwoTone } from '@mui/icons-material';

interface IProps {
  list: any;
  callback: any;
}

const useStyles = makeStyles({
  searchBar: {
    width: '100%',
    '& .MuiInputLabel-root': {
      color: theme.palette.black.main,
      lineHeight: '1.7rem'
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.palette.black.main,
      textAlign: 'center'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: `2px solid ${theme.palette.indigo.main}`,
        height: 67
      },
      '&:hover fieldset': {
        border: `3px solid ${theme.palette.indigo.main}`
      },
      '&.Mui-focused fieldset': {
        border: `3px solid ${theme.palette.indigo.main}`
      }
    }
  }
});

export default function ProductsSearchBar({
  list,
  callback
}: IProps): React.ReactElement {
  const [searchFieldValue, setSearchFieldValue] = useState('');
  const newProductsHierarchy: object[] = [];

  const findListItemChildren = (listItemId: string) => {
    for (const listItem of list) {
      if (listItem.parent === listItemId) {
        newProductsHierarchy.push(listItem);
      }
    }

    console.log('List item childrne');
    console.log(newProductsHierarchy);
  };

  const findListItemTree = (listItemId: string) => {
    for (const listItem of list) {
      if (listItem.id === listItemId) {
        if (listItem.parent === '') {
          console.log('Is a parent');

          newProductsHierarchy.push(listItem);
          for (let i = 0; i < list.length; i++) {
            if (list[i].parent === listItemId) {
              newProductsHierarchy.push(list[i]);
            }
          }
        } else {
          console.log('Its not a parent');
          console.log(listItemId);
          for (let i = 0; i < list.length; i++) {
            if (listItemId === listItem.parent) {
              // ?????
            }
          }
        }
      }
    }
    console.log(newProductsHierarchy);
  };

  const performSearch = () => {
    for (const listItem of list) {
      const listItemTitleLowerCase = listItem.title.toLowerCase();
      const searchFieldValueLowerCase = searchFieldValue.toLowerCase();

      if (listItemTitleLowerCase.includes(searchFieldValueLowerCase)) {
        findListItemTree(listItem.id);
      }
    }
  };

  const onChange = (e: any) => {
    setSearchFieldValue(e.target.value);
  };

  const onKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      if (searchFieldValue.length !== 0) {
        performSearch();
      }
    }
  };

  const classes = useStyles();

  return (
    <TextField
      variant="outlined"
      className={classes.searchBar}
      label="Søk etter produkt"
      autoComplete="off"
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
  );
}
