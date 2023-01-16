import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import css from '../../Stylesheets/NewProduct.module.scss';
import GeneralErrorMessage from '../../../Form/GeneralErrorMessage';
import Nexus from '../../../Nexus/Nexus';
import theme from '../../../theme';
import { IPrefilledResponseProduct } from '../../../Nexus/entities/IPrefilledResponseProduct';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { ModelType } from '../../../Nexus/enums';
import { Parentable } from '../../../models/Parentable';
import { PrefilledResponseContainer } from '../PrefilledResponseContext';
import { useFormStyles } from '../../../components/Form/FormStyles';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox,
} from '../../../components/ModalBox/ModalBox';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import { PREFILLED_RESPONSE, PRODUCTS } from '../../../common/PathConstants';

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
  const { addProduct, setNewProductCreate, prefilledResponse } =
    PrefilledResponseContainer.useContainer();
  const formStyles = useFormStyles();
  const history = useHistory();

  const defaultValues: IPrefilledResponseProduct =
    nexus.prefilledResponseService.generateDefaultPrefilledResponseProductValues();

  const methods = useForm<IPrefilledResponseProduct>({
    resolver: nexus.resolverService.postResolver(
      ModelType.prefilledResponseProduct
    ),
    defaultValues,
  });

  useEffect(() => {
    if (product) {
      methods.setValue('originProduct', product);
    } else {
      handleClose();
    }
  }, [handleClose, methods, product]);
  useEffect(() => {
    if (product?.title) {
      methods.setValue('title', product.title);
    }
  }, [methods, product?.title]);

  const changeProduct = (): void => {
    setNewProductCreate(false);
  };

  const onSubmit = (post: IPrefilledResponseProduct): void => {
    const newProduct =
      nexus.prefilledResponseService.createPrefilledResponseProductWithId(post);
    addProduct(newProduct);
    history.push(
      `/${PREFILLED_RESPONSE}/${prefilledResponse.id}/${PRODUCTS}/${newProduct.id}/`
    );
    // handleClose();  //Do we need this?
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
