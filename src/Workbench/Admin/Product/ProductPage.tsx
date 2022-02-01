import React, { useState } from 'react';
import { Parentable } from '../../../models/Parentable';
import Card from '@mui/material/Card';
import NestableHierarcy from '../../../NestableHierarchy/NestableHierarcy';
import { IProduct, PostProductSchema } from '../../../Nexus/entities/IProduct';
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
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useTranslation } from 'react-i18next';
import Nexus from '../../../Nexus/Nexus';
import { IAlert } from '../../../models/IAlert';
import { v4 as uuidv4 } from 'uuid';
import { addAlert } from '../../../store/reducers/alert-reducer';

interface IFormValues {
  title: string | null;
  description: string | null;
}

const FormSchema = Joi.object().keys({
  title: Joi.string().max(20).required(),
  description: Joi.string().max(20).required()
});

const useStyles = makeStyles({
  productsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
    gap: 30,
    margin: 'auto',
    width: '60vw'
  },
  searchFieldButtonContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchField: {
    width: '500px'
  },
  addButton: { alignContent: 'flex-end' },
  addProductFormCard: {
    display: 'flex',
    gap: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 30,
    width: '500px'
  },
  cardButtons: { display: 'flex', justifyContent: 'center', gap: 10 }
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

  const product: IProduct = nexus.productService.generateDefaultProductValues(
    project.id
  );

  const {
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IProduct>({
    resolver: joiResolver(PostProductSchema),
    defaultValues: product
  });

  const searchFieldCallback = (result: any) => {
    setProducts(result);
  };

  const onSubmit = async (post: IProduct) => {
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
      reset();
    });
  };

  const methods = useForm<IFormValues>({
    resolver: joiResolver(FormSchema)
  });

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
              Add
            </Button>
          </Box>
        </Box>

        {show && (
          <Card variant="outlined" className={classes.addProductFormCard}>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextCtrl name="title" label="Title" />
                <TextCtrl name="description" label="Description" />

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
          </Card>
        )}

        <NestableHierarcy
          dispatchfunc={(items: Parentable<IProduct>[]) =>
            newProductList(items)
          }
          inputlist={products.length > 0 ? products : project.products}
          component={<EditProductForm element={project.products[0]} />}
          depth={5}
        />
      </Box>
    </>
  );
}
