import React from 'react';
import { Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import NewProductHeader from '../../../components/NewProductHeader/NewProductHeader';
import Nexus from '../../../Nexus/Nexus';

import theme from '../../../theme';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import NeedList from '../../../components/NeedList/NeedList';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { ISpecificationProduct } from '../../../Nexus/entities/ISpecificationProduct';
import { ModelType } from '../../../Nexus/enums';
import { Parentable } from '../../../models/Parentable';
import { useFormStyles } from '../../../components/Form/FormStyles';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox
} from '../../../components/ModalBox/ModalBox';
import css from '../../Stylesheets/NewProduct.module.scss';
import { useSpecificationState } from '../SpecificationContext';
import SpecificationService from '../../../Nexus/services/SpecificationService';

interface IProps {
  specProduct: Parentable<IProduct> | null;
  handleClose: () => void;
}

export default function NewProductForm({
  specProduct,
  handleClose
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const formStyles = useFormStyles();
  const { specification, addSpecificationProduct, setNewProductCreate } =
    useSpecificationState();
  const defaultValues: ISpecificationProduct =
    SpecificationService.defaultSpecificationProduct();
  const methods = useForm<ISpecificationProduct>({
    resolver: nexus.resolverService.postResolver(
      ModelType.specificationProduct
    ),
    defaultValues
  });
  if (specProduct) {
    methods.setValue('originProduct', specProduct);
  } else {
    handleClose();
  }
  const changeProduct = (): void => {
    setNewProductCreate(false);
  };
  const onSubmit = (post: ISpecificationProduct): void => {
    const newProduct = nexus.specificationService.withId(post);
    addSpecificationProduct(newProduct);
    handleClose();
  };
  return (
    <div className={css.NewProduct}>
      <FormProvider {...methods}>
        <form
          className={formStyles.singlePageForm}
          onSubmit={methods.handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          <ModalBox>
            <div className={css.Content}>
              <div className={css.Columns}>
                <div className={css.Column}>
                  <Typography
                    variant={'smBold'}
                    color={theme.palette.primary.main}
                  >
                    {t('Product')}
                    {': '} {specProduct?.title}
                  </Typography>
                </div>
                <div className={css.Column}>
                  <ModalButton variant="contained" onClick={changeProduct}>
                    {t('Change')}
                  </ModalButton>
                </div>
              </div>
              <NewProductHeader />
              <ModalFieldsBox>
                <VerticalTextCtrl
                  name="amount"
                  label={t(
                    'How many of this product do you need in this procurement'
                  )}
                  placeholder={t('Quantity')}
                  type={'number'}
                />
              </ModalFieldsBox>
              <ModalButtonsBox>
                <ModalButton variant="cancel" onClick={() => handleClose()}>
                  {t('Cancel')}
                </ModalButton>
                <ModalButton variant="save" type="submit">
                  {t('save')}
                </ModalButton>
              </ModalButtonsBox>
              {specProduct && (
                <NeedList product={specProduct} bank={specification.bank} />
              )}
            </div>
          </ModalBox>
        </form>
      </FormProvider>
    </div>
  );
}
