import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from '../../Stylesheets/NewProduct.module.scss';
import NewProductHeader from '../../../components/NewProductHeader/NewProductHeader';
import Nexus from '../../../Nexus/Nexus';
import NeedList from '../../../components/NeedList/NeedList';
import ProductSelection from '../../../components/ProductSelection/ProductSelection';
import SpecificationService from '../../../Nexus/services/SpecificationService';
import theme from '../../../theme';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { ISpecificationProduct } from '../../../Nexus/entities/ISpecificationProduct';
import { ModelType } from '../../../Nexus/enums';
import { Parentable } from '../../../models/Parentable';
import { useFormStyles } from '../../../components/Form/FormStyles';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import { useSpecificationState } from '../SpecificationContext';

export default function NewProduct(): React.ReactElement {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const formStyles = useFormStyles();
  const { specification, addSpecificationProduct } = useSpecificationState();
  const { setProductIndex } = useProductIndexState();
  const [product, setProduct] = useState<Parentable<IProduct> | null>(null);

  const defaultValues: ISpecificationProduct =
    SpecificationService.defaultSpecificationProduct();

  const methods = useForm<ISpecificationProduct>({
    resolver: nexus.resolverService.postResolver(
      ModelType.specificationProduct
    ),
    defaultValues
  });

  useEffect(() => {
    if (!product) {
      const firstProduct = specification.bank.products[0];
      setProduct(firstProduct);
      methods.setValue('originProduct', firstProduct);
    }
  }, [specification, product, setProduct, methods]);

  const onSubmit = (post: ISpecificationProduct): void => {
    const newProduct = nexus.specificationService.withId(post);
    const newId = specification.products.length;
    addSpecificationProduct(newProduct);
    setProductIndex(newId);
  };

  const nonDeletedProducts: Parentable<IProduct>[] =
    specification.bank.products.filter((item) => !item.deletedDate);

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
              <VerticalTextCtrl
                name="amount"
                label={t(
                  'How many of this product do you need in this procurement'
                )}
                placeholder={t('Quantity')}
                type={'number'}
              />
              <Typography variant={'smBold'} color={theme.palette.primary.main}>
                {t('Choose a product type from the requirement set')}{' '}
                <i>{specification.bank.title}</i>{' '}
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
              <Button
                className={css.Button}
                type="submit"
                aria-label={t('Save')}
                variant="save"
              >
                {t('Save')}
              </Button>
              {product && (
                <NeedList product={product} bank={specification.bank} />
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
