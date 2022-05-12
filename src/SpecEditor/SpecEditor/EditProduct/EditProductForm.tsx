import { joiResolver } from '@hookform/resolvers/joi';
import Typography from '@mui/material/Typography';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import theme from '../../../theme';
import {
  ModalBox,
  ModalFieldsBox,
  ModalButtonsBox,
  ModalButton
} from '../../../Workbench/Components/ModalBox';
import {
  ISpecificationProduct,
  SpecificationProductSchema
} from '../../../models/ISpecificationProduct';
import React from 'react';
import { editSpecProduct } from '../../../store/reducers/spesification-reducer';
import { useAppDispatch } from '../../../store/hooks';

interface IProps {
  specificationProduct: ISpecificationProduct;
  handleClose: () => void;
}

const NewProductForm = ({ handleClose, specificationProduct }: IProps) => {
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
              label={t('name of product')}
              placeholder={t('name of product')}
            />
            <VerticalTextCtrl
              name="description"
              label={t('description of the product')}
              placeholder={t('description of the product')}
            />
            <VerticalTextCtrl
              name="amount"
              label={t(
                'how many of this product do you need in this procurement'
              )}
              placeholder={t('quantity')}
              type={'number'}
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="cancel" onClick={() => handleClose()}>
              {t('cancel')}
            </ModalButton>
            <ModalButton variant="save" type="submit">
              {t('save')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
      </form>
    </FormProvider>
  );
};

export default NewProductForm;
