import React from 'react';
import Typography from '@mui/material/Typography';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';

import theme from '../../../theme';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import { editSpecProduct } from '../../../store/reducers/spesification-reducer';
import {
  ISpecificationProduct,
  SpecificationProductSchema
} from '../../../Nexus/entities/ISpecificationProduct';
import {
  ModalBox,
  ModalFieldsBox,
  ModalButtonsBox,
  ModalButton
} from '../../../components/ModalBox/ModalBox';
import { useAppDispatch } from '../../../store/hooks';

interface IProps {
  handleClose: () => void;
  specificationProduct: ISpecificationProduct;
}

const EditProductForm = ({ handleClose, specificationProduct }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const methods = useForm<ISpecificationProduct>({
    resolver: joiResolver(SpecificationProductSchema),
    defaultValues: specificationProduct
  });

  const onSubmit = (put: ISpecificationProduct): void => {
    dispatch(editSpecProduct({ product: put }));
    handleClose();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <ModalBox>
          <Typography variant="lg" color={theme.palette.primary.main}>
            {t('Edit product')}
          </Typography>
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="title"
              label={t('Name of product')}
              placeholder={t('Name of product')}
            />
            <VerticalTextCtrl
              name="description"
              label={t('Description of the product')}
              placeholder={t('Description of the product')}
            />
            <VerticalTextCtrl
              name="amount"
              label={t(
                'How many of this product do you need in this procurement'
              )}
              placeholder={t('quantity')}
              type={'number'}
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose()}>
              {t('Cancel')}
            </ModalButton>
            <ModalButton variant="save" type="submit">
              {t('Save')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
      </form>
    </FormProvider>
  );
};

export default EditProductForm;
