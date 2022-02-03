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
import ProductsSearchBar from './ProductSearchBar';

import { Box } from '@mui/material/';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import theme from '../../../theme';
import AddNewProductForm from './AddNewProductForm';
import Dialog from '../../../components/DFODialog/DFODialog';

const useStyles = makeStyles({
  productsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
    gap: 30,
    margin: 'auto',
    width: '60vw',
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30
  },
  searchFieldButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('header')]: {
      flexDirection: 'column',
      gap: 20
    }
  },
  searchField: {
    width: '35vw',
    minWidth: 300,
    paddingRight: 10,
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'center',
      minWidth: 400
    }
  },
  addButton: {
    alignContent: 'flex-end',
    backgroundColor: 'red',

    [theme.breakpoints.down('md')]: {
      alignSelf: 'center'
    }
  },
  addProductFormCard: {
    display: 'flex',
    gap: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 30,
    width: '34.5vw',
    minWidth: 300,

    [theme.breakpoints.down('md')]: {
      alignSelf: 'center'
    }
  },
  cardComponents: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  cardTextFields: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'column',
    gap: 10,
    width: '20vw'
  },
  cardButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10
  },
  hierarcy: {
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

  return (
    <>
      <Box className={classes.productsContainer}>
        <Box className={classes.searchFieldButtonContainer}>
          <Box className={classes.searchField}>
            <ProductsSearchBar
              list={project.products}
              callback={searchFieldCallback}
            />
          </Box>
          <Box className={classes.addButton}>
            <Button
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
          children={<AddNewProductForm handleClose={() => setShow(false)} />}
        />

        <Box className={classes.hierarcy}>
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
