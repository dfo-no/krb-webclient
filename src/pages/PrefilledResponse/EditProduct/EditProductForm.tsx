import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, RadioGroup } from '@mui/material';
import { Button, Type, Variant } from '@dfo-no/components.button';

import css from '../../Stylesheets/EditorFullPage.module.scss';
import Nexus from '../../../Nexus/Nexus';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import { ModelType } from '../../../Nexus/enums';
import { FormFieldsBox } from '../../../components/Form/FormFieldsBox';
import { IPrefilledResponseProduct } from '../../../Nexus/entities/IPrefilledResponseProduct';
import { DFORadio } from '../../../components/DFORadio/DFORadio';
import { PrefilledResponseContainer } from '../PrefilledResponseContext';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import MultipleProductSelection from '../../../components/ProductSelection/MultipleProductSelection';
import { Parentable } from '../../../models/Parentable';
import { IProduct } from '../../../Nexus/entities/IProduct';

interface IProps {
  handleClose: () => void;
  prefilledResponseProduct: IPrefilledResponseProduct;
}

const EditProductForm = ({ handleClose, prefilledResponseProduct }: IProps) => {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const { productIndex } = useProductIndexState();
  const { prefilledResponse, editProduct } =
    PrefilledResponseContainer.useContainer();
  const [relatedProducts, setRelatedProducts] = useState(false);
  const options = [
    { value: true, label: t('common.Yes'), recommended: false },
    { value: false, label: t('common.No'), recommended: false },
  ];
  const methods = useForm<IPrefilledResponseProduct>({
    resolver: nexus.resolverService.resolver(
      ModelType.prefilledResponseProduct
    ),
    defaultValues: prefilledResponseProduct,
  });

  const onSubmit = (put: IPrefilledResponseProduct): void => {
    editProduct(put, productIndex);
    handleClose();
  };

  const relatedProductsClicked = () => {
    if (relatedProducts) {
      methods.setValue('relatedProducts', []);
    }
    setRelatedProducts(!relatedProducts);
  };
  const nonDeletedRelatedProducts: Parentable<IProduct>[] =
    prefilledResponse.bank.products.filter((item) => !item.deletedDate);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <FormFieldsBox>
          <Typography variant="lgBold">{t('Edit product details')}</Typography>
          <VerticalTextCtrl
            name="title"
            label={t('Name of product')}
            placeholder={t('Name of product')}
            autoFocus
          />
          <VerticalTextCtrl
            name="description"
            label={t('Description of the product')}
            placeholder={t('Description of the product')}
          />
          <Typography variant={'smBold'}>
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
                  label={<Typography variant={'sm'}>{option.label}</Typography>}
                />
              );
            })}
          </RadioGroup>
          {nonDeletedRelatedProducts.length > 0 && relatedProducts && (
            <MultipleProductSelection
              name={'relatedProducts'}
              products={nonDeletedRelatedProducts}
            />
          )}
          <div className={css.formButtons}>
            <Button type={Type.Submit}>{t('Save')}</Button>
            <Button variant={Variant.Inverted} onClick={() => handleClose()}>
              {t('common.Cancel')}
            </Button>
          </div>
        </FormFieldsBox>
      </form>
    </FormProvider>
  );
};

export default EditProductForm;
