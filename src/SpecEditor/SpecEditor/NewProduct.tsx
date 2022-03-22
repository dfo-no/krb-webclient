import { Box, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import React from 'react';
import { useAppSelector } from '../../store/hooks';
import makeStyles from '@mui/styles/makeStyles';
import { useGetBankQuery } from '../../store/api/bankApi';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { IProduct, PostProductSchema } from '../../Nexus/entities/IProduct';
import useProjectMutations from '../../store/api/ProjectMutations';
import { Parentable } from '../../models/Parentable';
import Nexus from '../../Nexus/Nexus';
import { joiResolver } from '@hookform/resolvers/joi';
import theme from '../../theme';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import NewProductHeader from './NewProductHeader';
import NewProductTypeList from './NewProductTypeList';
import NewProductNeedList from './NewProductNeedList';

const useStyles = makeStyles({
  newProduct: {
    width: '100%',
    height: '100%',
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
    paddingBottom: 60,
    margin: '0 auto',
    width: '60%',
    backgroundColor: theme.palette.dfoWhite.main,
    padding: 20
  },
  topContainer: {
    display: 'flex',
    gap: 30,
    flexDirection: 'column'
  },
  productTypeContainer: {
    marginTop: 23
  },
  saveButtonContainer: {
    display: 'flex',
    width: '100%',
    marginTop: 20,
    justifyContent: 'flex-end'
  },
  saveButton: {
    width: 45
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
    <Box className={classes.newProduct}>
      <FormProvider {...methods}>
        <form>
          <NewProductHeader />
          <Box className={classes.mainContainer}>
            <Box className={classes.topContainer}>
              <VerticalTextCtrl
                name="number"
                label={t(
                  'how many of this product do you need in this procurement'
                )}
                placeholder={t('Antall')}
              />
              <Divider />
            </Box>
            <Box className={classes.productTypeContainer}>
              <NewProductTypeList />
            </Box>
            <Box className={classes.saveButtonContainer}>
              <Button className={classes.saveButton} variant="save">
                {t('save')}
              </Button>
            </Box>
            <Box>
              <NewProductNeedList />
            </Box>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}
