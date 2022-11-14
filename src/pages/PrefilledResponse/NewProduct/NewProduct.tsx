import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from '../../Stylesheets/NewProduct.module.scss';
import GeneralErrorMessage from '../../../Form/GeneralErrorMessage';
import Nexus from '../../../Nexus/Nexus';
import theme from '../../../theme';
import { addProduct } from '../../../store/reducers/prefilled-response-reducer';
import { IPrefilledResponseProduct } from '../../../Nexus/entities/IPrefilledResponseProduct';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { ModelType } from '../../../Nexus/enums';
import { Parentable } from '../../../models/Parentable';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useFormStyles } from '../../../components/Form/FormStyles';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox,
} from '../../../components/ModalBox/ModalBox';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';

interface IProps {
  product: Parentable<IProduct> | null;
  handleClose: () => void;
}
export default function NewProduct({
  product,
  handleClose,
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );
  const formStyles = useFormStyles();
  const dispatch = useAppDispatch();
  const { setProductIndex, setCreate } = useProductIndexState();

  const defaultValues: IPrefilledResponseProduct =
    nexus.prefilledResponseService.generateDefaultPrefilledResponseProductValues();

  const methods = useForm<IPrefilledResponseProduct>({
    resolver: nexus.resolverService.postResolver(
      ModelType.prefilledResponseProduct
    ),
    defaultValues,
  });

  if (product) {
    methods.setValue('originProduct', product);
  } else {
    handleClose();
  }
  useEffect(() => {
    if (product?.title) {
      methods.setValue('title', product.title);
    }
  }, [methods, product?.title]);

  const changeProduct = (): void => {
    setCreate(false);
  };

  const onSubmit = (post: IPrefilledResponseProduct): void => {
    const newProduct =
      nexus.prefilledResponseService.createPrefilledResponseProductWithId(post);
    const newId = prefilledResponse.products.length;
    dispatch(addProduct(newProduct));
    setProductIndex(newId);
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
              <div className={css.Content__header}>
                <Typography
                  variant={'smBold'}
                  color={theme.palette.primary.main}
                >
                  {t('Product')}
                  {': '} {product?.title}
                </Typography>
                <ModalButton variant="contained" onClick={changeProduct}>
                  {t('Change')}
                </ModalButton>
              </div>
              <ModalFieldsBox>
                <VerticalTextCtrl
                  name="title"
                  label={t('Name of product')}
                  placeholder={t('Name')}
                  autoFocus
                />
                <VerticalTextCtrl
                  name="description"
                  label={t('Description of the product')}
                  placeholder={t('Description')}
                />
              </ModalFieldsBox>
              <ModalButtonsBox>
                <ModalButton variant="cancel" onClick={() => handleClose()}>
                  {t('common.Cancel')}
                </ModalButton>
                <ModalButton variant="save" type="submit">
                  {t('Save')}
                </ModalButton>
              </ModalButtonsBox>
            </div>
          </ModalBox>
          <GeneralErrorMessage errors={methods.formState.errors} />
        </form>
      </FormProvider>
    </div>
  );
}
