import React, { useEffect, useState } from 'react';
import { Parentable } from '../../../models/Parentable';
import { Nestable } from '../../../models/Nestable';
import { IProduct } from '../../../Nexus/entities/IProduct';
import SearchUtils from '../../../common/SearchUtils';
import Utils from '../../../common/Utils';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  putSelectedProjectThunk,
  updateProductList
} from '../../../store/reducers/project-reducer';
import { Box, Button } from '@mui/material/';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import NestableHierarcyWithAccordion from '../../../NestableHierarchy/NestableHierarcyWithAccordion';
import NewProductForm from './NewProductForm';
import EditProductForm from './EditProductForm';
import Dialog from '../../../components/DFODialog/DFODialog';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import theme from '../../../theme';

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

  const [allProducts, setAllProducts] = useState<Nestable<IProduct>[]>([]);

  const [products, setProducts] = useState<Nestable<IProduct>[]>([]);
  const [show, setShow] = useState(false);

  const classes = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    const nestedList = Utils.parentable2Nestable(project.products);
    setAllProducts(nestedList);
    setProducts(nestedList);
  }, [project.products]);

  const moveProduct = (movedItem: Parentable<IProduct>, index: number) => {
    const newProductList = [...project.products];
    const indexOfMoved = newProductList.findIndex(
      (oldItem) => oldItem.id === movedItem.id
    );
    newProductList.splice(indexOfMoved, 1);
    newProductList.splice(index, 0, movedItem);

    dispatch(updateProductList(newProductList));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  const searchFieldCallback = (result: Nestable<IProduct>[]) => {
    setProducts(result);
  };

  const productsSearch = (searchString: string, list: Nestable<IProduct>[]) => {
    return list
      .map((product) => SearchUtils.search(product, searchString))
      .filter((product) => product.inSearch)
      .map((product) => product as IProduct);
  };

  return (
    <>
      <Box className={classes.productsContainer}>
        <Box className={classes.topContainer}>
          <Box className={classes.searchBarContainer}>
            {' '}
            <DFOSearchBar
              list={allProducts}
              label={t('search for product')}
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
          <NestableHierarcyWithAccordion
            dispatchfunc={(item: Parentable<IProduct>, index: number) =>
              moveProduct(item, index)
            }
            inputlist={products}
            component={<EditProductForm element={products[0]} />}
            depth={5}
          />
        </Box>
      </Box>
    </>
  );
}
