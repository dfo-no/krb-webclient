import React, { useState } from 'react';
import { Parentable } from '../../../models/Parentable';
import Card from '@mui/material/Card';
import NestableHierarcy from '../../../NestableHierarchy/NestableHierarcy';
import { IProduct, PostProductSchema } from '../../../Nexus/entities/IProduct';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addProduct,
  putSelectedProjectThunk,
  updateProductList
} from '../../../store/reducers/project-reducer';
import EditProductForm from './EditProductForm';
import ProductsSearchBar from './ProductSearchBar';

import { Box } from '@mui/material/';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import TextCtrl from '../../../FormProvider/TextCtrl';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Nexus from '../../../Nexus/Nexus';
import { addAlert } from '../../../store/reducers/alert-reducer';
import theme from '../../../theme';

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
    width: '35vw',
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
    gap: 10
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
  const [products, setProducts] = useState([]);

  const [show, setShow] = useState(false);

  const nexus = Nexus.getInstance();

  const newProductList = (items: Parentable<IProduct>[]) => {
    dispatch(updateProductList(items));
    dispatch(putSelectedProjectThunk('dummy'));
  };

  const searchFieldCallback = (result: any) => {
    setProducts(result);
  };

  const classes = useStyles();
  const { t } = useTranslation();

  const product: IProduct = nexus.productService.generateDefaultProductValues(
    project.id
  );

  const methods = useForm<IProduct>({
    resolver: joiResolver(PostProductSchema),
    defaultValues: product
  });

  const saveValues = (post: IProduct) => {
    const newProduct = nexus.productService.createProductWithId(post);
    const alert: IAlert = {
      id: uuidv4(),
      style: 'success',
      text: 'successfully added a new product'
    };
    dispatch(addProduct(newProduct));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      dispatch(addAlert({ alert }));
      setShow(false);
    });
  };

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

        {show && (
          <Card variant="outlined" className={classes.addProductFormCard}>
            <Box className={classes.cardComponents}>
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(saveValues)}>
                  <Box className={classes.cardTextFields}>
                    <TextCtrl name="title" label="Title" />
                    <TextCtrl name="description" label="Description" />
                  </Box>

                  <Box className={classes.cardButtons}>
                    <Button variant="primary" type="submit">
                      {t('save')}
                    </Button>
                    <Button variant="primary" onClick={() => setShow(false)}>
                      {t('cancel')}
                    </Button>
                  </Box>
                </form>
              </FormProvider>
            </Box>
          </Card>
        )}

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
