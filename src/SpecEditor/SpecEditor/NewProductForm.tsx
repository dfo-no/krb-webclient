import { Box, Button } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../store/hooks';
import makeStyles from '@mui/styles/makeStyles';
import { useGetBankQuery } from '../../store/api/bankApi';
import { useTranslation } from 'react-i18next';
import HorizontalTextCtrl from '../../FormProvider/HorizontalTextCtrl';
import { FormProvider, useForm } from 'react-hook-form';
import { IProduct, PostProductSchema } from '../../Nexus/entities/IProduct';
import useProjectMutations from '../../store/api/ProjectMutations';
import { Parentable } from '../../models/Parentable';
import Nexus from '../../Nexus/Nexus';
import { joiResolver } from '@hookform/resolvers/joi';
import theme from '../../theme';

const useStyles = makeStyles({
  editor: {
    display: 'flex',
    height: '100%',
    width: '100vw'
  },
  newProductContent: {
    backgroundColor: theme.palette.gray200.main,
    width: '100%'
  },
  newProductContainer: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    padding: 20
  },
  newProductFormContainer: {
    display: 'flex',
    flexBasis: '80%',
    paddingLeft: 100,
    flexDirection: 'column',
    gap: 9
  },
  optionButtons: {
    display: 'flex'
  }
});

export default function NewProductForm(): React.ReactElement {
  const selectedBank = useAppSelector((state) => state.selectedBank);
  const { data: bankSelected } = useGetBankQuery(String(selectedBank.id));
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const classes = useStyles();

  const { addProduct } = useProjectMutations();

  const defaultValues: Parentable<IProduct> =
    nexus.productService.generateDefaultProductValues(String(selectedBank.id));

  const methods = useForm<Parentable<IProduct>>({
    resolver: joiResolver(PostProductSchema),
    defaultValues
  });

  async function onSubmit(post: Parentable<IProduct>) {
    const newProduct = nexus.productService.createProductWithId(post);
    await addProduct(newProduct).then(() => {
      methods.reset();
    });
  }

  return (
    <Box className={classes.editor}>
      <Box className={classes.newProductContent}>
        <FormProvider {...methods}>
          <form>
            <Box className={classes.newProductContainer}>
              <Box className={classes.newProductFormContainer}>
                <HorizontalTextCtrl name="name" placeholder="Navn på produkt" />
                <HorizontalTextCtrl
                  name="description"
                  placeholder="Beskrivelse av produktet"
                />
              </Box>
              <Box className={classes.optionButtons}>
                <Button variant="saveTransparent">Lagre</Button>
                <Button variant="warningTransparent">Avbryt</Button>{' '}
                <Button variant="warningTransparent">Slett behov</Button>
              </Box>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
}
