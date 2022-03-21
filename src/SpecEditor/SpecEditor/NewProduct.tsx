import { Box, Button, Divider } from '@mui/material';
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
import { StandardContainer } from '../../Workbench/Components/StandardContainer';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';

const useStyles = makeStyles({
  editor: {
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
    gap: 12
  },
  optionButtons: {
    display: 'flex'
  },
  mainContainer: {
    display: 'flex',
    paddingTop: 50,
    margin: '0 auto',
    width: '50%'
  }
});

export default function NewProduct(): React.ReactElement {
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
      <FormProvider {...methods}>
        <form>
          <Box className={classes.newProductContent}>
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
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}
