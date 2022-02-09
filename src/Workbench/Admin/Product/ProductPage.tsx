import React, { useState } from 'react';
import { Parentable } from '../../../models/Parentable';
import NestableHierarcy from '../../../NestableHierarchy/NestableHierarcy';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  putSelectedProjectThunk,
  updateProductList
} from '../../../store/reducers/project-reducer';
import EditProductForm from './EditProductForm';
import { Box, Button } from '@mui/material/';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import theme from '../../../theme';
import NewProductForm from './NewProductForm';
import Dialog from '../../../components/DFODialog/DFODialog';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';

const useStyles = makeStyles({
  productsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
    gap: 30,
    margin: 'auto',
    width: '55.5vw',
    paddingBottom: 40
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    [theme.breakpoints.down('mddd')]: {
      flexDirection: 'column',
      gap: 15
    }
  },
  searchBarContainer: {
    flex: 1,
    minWidth: 300,
    alignSelf: 'center'
  },
  addCodeButtonContainer: {
    flex: 1,
    alignSelf: 'center'
  },
  addCodeButton: {
    float: 'right',
    alignSelf: 'center'
  },
  products: {
    [theme.breakpoints.down('sm')]: {
      alignSelf: 'center',
      width: 400
    }
  }
});

export default function ProductPage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [show, setShow] = useState(false);

  const newProductList = (items: Parentable<IProduct>[]) => {
    dispatch(updateProductList(items));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  const searchFieldCallback = (result: IProduct[]) => {
    setProducts(result);
  };

  const classes = useStyles();
  const { t } = useTranslation();

  const productsSearch = (searchString: string, list: IProduct[]) => {
    const searchResultProducts: Parentable<IProduct>[] = [];

    const findListItemParent = (listItem: IProduct) => {
      if (listItem.parent === '') {
        return;
      }

      const parent: Parentable<IProduct> | undefined = list.find(
        (product: IProduct) => product.id === listItem.parent
      );

      if (parent?.parent !== '') {
        if (parent) {
          findListItemParent(parent);
        }
      } else {
        searchResultProducts.push(parent);
      }
    };

    for (const listItem of list) {
      const listItemTitleLowerCase = listItem.title.toLowerCase();
      const searchStringLowerCase = searchString.toLowerCase();

      if (listItemTitleLowerCase.includes(searchStringLowerCase)) {
        findListItemParent(listItem);
        searchResultProducts.push(listItem);
      }
    }

    return searchResultProducts;
  };

  return (
    <>
      <Box className={classes.productsContainer}>
        <Box className={classes.topContainer}>
          <Box className={classes.searchBarContainer}>
            {' '}
            <DFOSearchBar
              list={project.products}
              callback={searchFieldCallback}
              searchFunction={productsSearch}
            />
          </Box>
          <Box className={classes.addCodeButtonContainer}>
            <Button
              className={classes.addCodeButton}
              variant="primary"
              onClick={() => {
                setShow(true);
              }}
            >
              {t('add new product')}
            </Button>
          </Box>
        </Box>

        <Dialog
          title={t('add new product')}
          isOpen={show}
          handleClose={() => setShow(false)}
          children={<NewProductForm handleClose={() => setShow(false)} />}
        />

        <Box className={classes.products}>
          <NestableHierarcy
            dispatchfunc={(items: Parentable<IProduct>[]) =>
              newProductList(items)
            }
            inputlist={products.length > 0 ? products : project.products}
            component={<EditProductForm element={project.products[0]} />}
            depth={5}
          />
        </Box>
      </Box>
    </>
  );
}
