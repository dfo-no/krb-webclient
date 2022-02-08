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
import NewProductForm from './NewProductForm';
import Dialog from '../../../components/DFODialog/DFODialog';
import Utils from '../../../common/Utils';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';

const useStyles = makeStyles({
  productsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
    gap: 30,
    margin: 'auto',
    width: '55.5vw',
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30
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
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    [theme.breakpoints.down('gg')]: {
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
  addCodeButton: { float: 'right', alignSelf: 'center' }
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

  const productSearch = (searchString: string, list: IProduct[]) => {
    console.log(searchString);
    console.log(list);
  };

  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Box className={classes.productsContainer}>
        <Box className={classes.topContainer}>
          <Box className={classes.searchBarContainer}>
            {' '}
            <DFOSearchBar
              list={project.codelist}
              callback={searchFieldCallback}
              searchFunction={productSearch}
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
