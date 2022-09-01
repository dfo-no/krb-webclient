import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControlLabel,
  Typography,
  RadioGroup
} from '@mui/material';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from '../../Stylesheets/NewProduct.module.scss';
import GeneralErrorMessage from '../../../Form/GeneralErrorMessage';
import MultipleProductSelection from '../../../components/ProductSelection/MultipleProductSelection';
import NewProductHeader from '../../../components/NewProductHeader/NewProductHeader';
import Nexus from '../../../Nexus/Nexus';
import NeedList from '../../../components/NeedList/NeedList';
import ProductSelection from '../../../components/ProductSelection/ProductSelection';
import theme from '../../../theme';
import { addProduct } from '../../../store/reducers/prefilled-response-reducer';
import { DFORadio } from '../../../components/DFORadio/DFORadio';
import { IPrefilledResponseProduct } from '../../../Nexus/entities/IPrefilledResponseProduct';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { ModelType } from '../../../Nexus/enums';
import { Parentable } from '../../../models/Parentable';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useFormStyles } from '../../../components/Form/FormStyles';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';

export default function NewProduct(): React.ReactElement {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );
  const formStyles = useFormStyles();
  const dispatch = useAppDispatch();
  const { setProductIndex } = useProductIndexState();
  const [product, setProduct] = useState<Parentable<IProduct> | null>(null);
  const [relatedProducts, setRelatedProducts] = useState(false);
  const options = [
    { value: true, label: t('Yes'), recommended: false },
    { value: false, label: t('No'), recommended: false }
  ];

  const defaultValues: IPrefilledResponseProduct =
    nexus.prefilledResponseService.generateDefaultPrefilledResponseProductValues();

  const methods = useForm<IPrefilledResponseProduct>({
    resolver: nexus.resolverService.postResolver(
      ModelType.prefilledResponseProduct
    ),
    defaultValues
  });

  useEffect(() => {
    if (!product) {
      const firstProduct = prefilledResponse.bank.products[0];
      setProduct(firstProduct);
      methods.setValue('originProduct', firstProduct);
    }
  }, [prefilledResponse, product, setProduct, methods]);

  const useRelatedProducts = useWatch({
    name: 'relatedProducts',
    control: methods.control
  });

  const onSubmit = (post: IPrefilledResponseProduct): void => {
    const newProduct =
      nexus.prefilledResponseService.createPrefilledResponseProductWithId(post);
    const newId = prefilledResponse.products.length;
    dispatch(addProduct(newProduct));
    setProductIndex(newId);
  };

  const relatedProductsClicked = () => {
    if (relatedProducts) {
      methods.setValue('relatedProducts', []);
    }
    setRelatedProducts(!relatedProducts);
  };

  const nonDeletedProducts: Parentable<IProduct>[] =
    prefilledResponse.bank.products.filter((item) => !item.deletedDate);

  return (
    <div className={css.NewProduct}>
      <FormProvider {...methods}>
        <form
          className={formStyles.singlePageForm}
          onSubmit={methods.handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          <div>
            <NewProductHeader />
            <div className={css.Content}>
              <Typography variant={'smBold'} color={theme.palette.primary.main}>
                {t('Choose a product type from the requirement set')}{' '}
                <i>{prefilledResponse.bank.title}</i>{' '}
                {t('that fits the product best')}
              </Typography>
              {nonDeletedProducts.length && (
                <ProductSelection
                  products={nonDeletedProducts}
                  postChange={(selection: Parentable<IProduct>) => {
                    setProduct(selection);
                  }}
                />
              )}
              <Typography variant={'smBold'} color={theme.palette.primary.main}>
                {t('Add additional related products')}
              </Typography>
              <RadioGroup
                row={true}
                value={options[relatedProducts ? 0 : 1].value}
                onClick={relatedProductsClicked}
              >
                {options.map((option) => {
                  return (
                    <FormControlLabel
                      key={'' + option.value}
                      value={option.value}
                      control={<DFORadio />}
                      label={
                        <Typography
                          variant={'sm'}
                          color={theme.palette.black.main}
                        >
                          {option.label}
                        </Typography>
                      }
                    />
                  );
                })}
              </RadioGroup>
              {nonDeletedProducts.length && relatedProducts && (
                <MultipleProductSelection
                  name={'relatedProducts'}
                  products={nonDeletedProducts}
                />
              )}
              <Button
                className={css.Button}
                type="submit"
                aria-label={t('Save')}
                variant="save"
              >
                {t('Save')}
              </Button>
              {product && (
                <NeedList
                  product={product}
                  bank={prefilledResponse.bank}
                  relatedProducts={useRelatedProducts}
                />
              )}
            </div>
          </div>
          <GeneralErrorMessage errors={methods.formState.errors} />
        </form>
      </FormProvider>
    </div>
  );
}
