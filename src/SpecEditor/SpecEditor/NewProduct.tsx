import { Box, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
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
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';

const useStyles = makeStyles({
  editor: {
    width: '100vw',
    backgroundColor: theme.palette.gray200.main
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
    flexDirection: 'column',
    paddingTop: 50,
    margin: '0 auto',
    width: '60%',
    height: '100vh',
    backgroundColor: theme.palette.dfoWhite.main,
    padding: 20
  },
  topContainer: {
    display: 'flex',
    gap: 30,
    flexDirection: 'column'
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
          <Box>
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
          <Box className={classes.mainContainer}>
            <Box className={classes.topContainer}>
              <VerticalTextCtrl
                name="number"
                label="Hvor mange av dette produktet har du behov for i denne anskaffelsen?"
                placeholder="Antall"
              />
              <Divider />
            </Box>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}
