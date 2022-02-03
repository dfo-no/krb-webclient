import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import theme from '../../../theme';
import { TextField, InputAdornment } from '@mui/material/';
import Utils from '../../../common/Utils';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { Parentable } from '../../../models/Parentable';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material/';

interface IProps {
  list: Parentable<IProduct>[];
  callback: any;
}

const useStyles = makeStyles({
  searchBar: {
    width: '100%',
    '& .MuiInputLabel-root': {
      color: theme.palette.black.main
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.palette.black.main,
      textAlign: 'center'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: `2px solid ${theme.palette.indigo.main}`,
        height: 67,
        color: 'black',
        backgroundColor: 'white'
      },
      '&:hover fieldset': {
        border: `3px solid ${theme.palette.indigo.main}`
      },
      '&.Mui-focused fieldset': {
        border: `3px solid ${theme.palette.indigo.main}`
      }
    }
  },
  searchFieldIcon: {}
});

export default function ProductsSearchBar({
  list,
  callback
}: IProps): React.ReactElement {
  const [searchFieldValue, setSearchFieldValue] = useState('');
  let newProductsHierarchy: Parentable<IProduct>[] = [];

  const findListItemParent = (listItem: IProduct) => {
    newProductsHierarchy.push(listItem);

    if (listItem.parent === '') {
      return;
    }

    const parent: Parentable<IProduct> = Utils.ensure(
      list.find((product: IProduct) => product.id === listItem.parent)
    );

    if (parent.parent !== '') {
      findListItemParent(parent);
    } else {
      newProductsHierarchy.push(parent);
    }
  };

  const findListItemTree = (item: IProduct) => {
    findListItemParent(item);
  };

  const performSearch = () => {
    newProductsHierarchy = [];

    for (const listItem of list) {
      const listItemTitleLowerCase = listItem.title.toLowerCase();
      const searchFieldValueLowerCase = searchFieldValue.toLowerCase();

      if (listItemTitleLowerCase.includes(searchFieldValueLowerCase)) {
        findListItemTree(listItem);
        callback(newProductsHierarchy);
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
    <Box>
      <TextField
        variant="outlined"
        className={classes.searchBar}
        label="Søk etter produkt"
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
    </Box>
  );
}
