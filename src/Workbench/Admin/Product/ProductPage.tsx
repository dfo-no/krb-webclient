import React from 'react';
import { useTranslation } from 'react-i18next';
import { Parentable } from '../../../models/Parentable';
import NestableHierarcy from '../../../NestableHierarchy/NestableHierarcy';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  putSelectedProjectThunk,
  updateProductList
} from '../../../store/reducers/project-reducer';
import EditProductForm from './EditProductForm';
import NewProductForm from './NewProductForm';
import ProductsSearchBar from './ProductSearchBar';

import { Box, Typography } from '@mui/material/';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  productsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    margin: 'auto',
    width: '60vw'
  },
  productOptions: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

export default function ProductPage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const newProductList = (items: Parentable<IProduct>[]) => {
    dispatch(updateProductList(items));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  const classes = useStyles();

  return (
    <Box className={classes.productsContainer}>
      <Box className={classes.productOptions}>
        <ProductsSearchBar />
        <NewProductForm />
      </Box>

      <Box>
        <NestableHierarcy
          dispatchfunc={(items: Parentable<IProduct>[]) =>
            newProductList(items)
          }
          inputlist={project.products}
          component={<EditProductForm element={project.products[0]} />}
          depth={5}
        />
      </Box>
    </Box>
  );
}
