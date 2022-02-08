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

export default function ProductsSearchBar({
  list,
  callback
}: IProps): React.ReactElement {
  const [searchFieldValue] = useState('');
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

  const performSearch = (searchString: string) => {
    newProductsHierarchy = [];
    for (const listItem of list) {
      const listItemTitleLowerCase = listItem.title.toLowerCase();
      const searchStringLowerCase = searchString.toLowerCase();

      if (listItemTitleLowerCase.includes(searchStringLowerCase)) {
        findListItemParent(listItem);
        callback(newProductsHierarchy);
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    newProductsHierarchy = [];
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
      label={t('search for product')}
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
