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
import NewProductForm from './NewProductForm';
import ProductsSearchBar from './ProductSearchBar';

import { Box } from '@mui/material/';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  productsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
    gap: 20,
    margin: 'auto',
    width: '60vw'
  },
  productOptions: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  searchBar: {
    width: 700,
    alignSelf: 'center'
  },
  newProductForm: {
    alignSelf: 'center'
  }
});

export default function ProductPage(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState(project.products);

  const newProductList = (items: Parentable<IProduct>[]) => {
    dispatch(updateProductList(items));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  const searchFieldCallback = (result: any) => {
    console.log(result);
    setProducts(result);
  };

  const classes = useStyles();

  console.log(products);

  return (
    <Box className={classes.productsContainer}>
      <Box className={classes.productOptions}>
        <Box className={classes.searchBar}>
          {' '}
          <ProductsSearchBar
            list={project.products}
            callback={searchFieldCallback}
          />
        </Box>
        <Box className={classes.newProductForm}>
          <NewProductForm />
        </Box>
      </Box>

      <NestableHierarcy
        dispatchfunc={(items: Parentable<IProduct>[]) => newProductList(items)}
        inputlist={products}
        component={<EditProductForm element={project.products[0]} />}
        depth={5}
      />
    </Box>
  );
}
