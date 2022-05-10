import { Box, Button, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import React, { useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { IProduct } from '../../Nexus/entities/IProduct';
import { Parentable } from '../../models/Parentable';
import Nexus from '../../Nexus/Nexus';
import { joiResolver } from '@hookform/resolvers/joi';
import theme from '../../theme';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import NewProductHeader from './NewProductHeader';
import { useSpecificationState } from '../SpecificationContext';
import {
  ISpecificationProduct,
  PostSpecificationProductSchema
} from '../../models/ISpecificationProduct';
import SelectionSingularCtrl from '../../FormProvider/SelectionSingularCtrl';
import NeedList from './NeedList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addProduct } from '../../store/reducers/spesification-reducer';
import { ScrollableContainer } from '../../Workbench/Components/ScrollableContainer';
import { useFormStyles } from '../../Workbench/Components/Form/FormStyles';

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
    paddingTop: 32,
    paddingBottom: 32,
    margin: '0 auto',
    width: '90%',
    backgroundColor: theme.palette.white.main,
    padding: 20
  },
  productTypeContainer: {
    marginTop: 8
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
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const { spec } = useAppSelector((state) => state.specification);
  const formStyles = useFormStyles();
  const dispatch = useAppDispatch();
  const { setSpecificationProductIndex, setGenericRequirement, setCreate } =
    useSpecificationState();
  const [product, setProduct] = useState<Parentable<IProduct> | null>(null);
  const classes = useStyles();

  const defaultValues: ISpecificationProduct =
    nexus.specificationService.generateDefaultSpecificationProductValues();

  const methods = useForm<ISpecificationProduct>({
    resolver: joiResolver(PostSpecificationProductSchema),
    defaultValues
  });

  useEffect(() => {
    if (!product) {
      const firstProduct = spec.bank.products[0];
      setProduct(firstProduct);
      methods.setValue('originProduct', firstProduct);
    }
  }, [spec, product, setProduct, methods]);

  const onSubmit = async (post: ISpecificationProduct) => {
    const newProduct =
      nexus.specificationService.createSpecificationProductWithId(post);
    const newId = spec.products.length;
    dispatch(addProduct({ product: newProduct }));
    setSpecificationProductIndex(newId);
    setGenericRequirement(false);
    setCreate(false);
  };

  const nonDeletedProducts: Parentable<IProduct>[] = spec.bank.products.filter(
    (item) => !item.deletedDate
  );

  return (
    <Box className={classes.newProduct}>
      <FormProvider {...methods}>
        <form
          className={formStyles.singlePageForm}
          onSubmit={methods.handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%'
            }}
          >
            <NewProductHeader />
            <ScrollableContainer>
              <Box className={classes.mainContainer}>
                <VerticalTextCtrl
                  name="amount"
                  label={t(
                    'how many of this product do you need in this procurement'
                  )}
                  placeholder={t('quantity')}
                />
                <Divider sx={{ marginBottom: 4 }} />
                <Typography
                  variant={'smBold'}
                  color={theme.palette.primary.main}
                >
                  {t('Choose a product type from the requirement set')}{' '}
                  <i>{spec.bank.title}</i> {t('that fits the product best')}
                </Typography>
                <Box className={classes.productTypeContainer}>
                  {nonDeletedProducts && (
                    <SelectionSingularCtrl
                      name={'originProduct'}
                      initValue={nonDeletedProducts[0]}
                      saveAsString={false}
                      parentableItems={nonDeletedProducts}
                      postChange={(selection: Parentable<IProduct>) => {
                        setProduct(selection);
                      }}
                    />
                  )}
                </Box>
                <Box className={classes.saveButtonContainer}>
                  <Button
                    className={classes.saveButton}
                    type="submit"
                    aria-label="save"
                    variant="save"
                  >
                    {t('save')}
                  </Button>
                </Box>
                {product && <NeedList product={product} />}
              </Box>
            </ScrollableContainer>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}
