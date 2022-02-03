import React from 'react';
import { IProduct, PostProductSchema } from '../../../Nexus/entities/IProduct';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addProduct,
  putSelectedProjectThunk
} from '../../../store/reducers/project-reducer';

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

interface IProps {
  handleClose: () => void;
}

const useStyles = makeStyles({
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
  }
});

export default function ProductPage({
  handleClose
}: IProps): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();

  const nexus = Nexus.getInstance();

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
      handleClose();
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(saveValues)}>
          <Box className={classes.cardComponents}>
            <Box className={classes.cardTextFields}>
              <TextCtrl name="title" label={t('Title')} />
              <TextCtrl name="description" label={t('Description')} />
            </Box>

            <Box className={classes.cardButtons}>
              <Button variant="primary" type="submit">
                {t('save')}
              </Button>
              <Button variant="primary" onClick={handleClose}>
                {t('cancel')}
              </Button>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </>
  );
}
