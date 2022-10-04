import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';

import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import Nexus from '../../../Nexus/Nexus';
import { useSpecificationState } from '../../SpecEditor/SpecificationContext';
import { IResponseProduct } from '../../../Nexus/entities/IResponseProduct';
import { ModelType } from '../../../Nexus/enums';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import Typography from '@mui/material/Typography';
import theme from '../../../theme';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
  ModalFieldsBox
} from '../../../components/ModalBox/ModalBox';
import GeneralErrorMessage from '../../../Form/GeneralErrorMessage';
import { editResponseProduct } from '../../../store/reducers/response-reducer';

interface IProps {
  handleSubmit: () => void;
}

export default function EditResponseProduct({
  handleSubmit
}: IProps): ReactElement {
  const { t } = useTranslation();
  const { productIndex } = useProductIndexState();
  const { response } = useAppSelector((state) => state.response);
  const nexus = Nexus.getInstance();
  const { specification } = useSpecificationState();
  const dispatch = useAppDispatch();

  const methods = useForm<IResponseProduct>({
    resolver: nexus.resolverService.resolver(ModelType.responseProduct),
    defaultValues: response.products[productIndex]
  });

  const onSubmit = (put: IResponseProduct) => {
    dispatch(editResponseProduct(put));
    handleSubmit();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <ModalBox>
          <ModalFieldsBox>
            <VerticalTextCtrl
              name="price"
              label={t('Price of product')}
              placeholder={t('Price of product')}
              children={
                <Typography color={theme.palette.primary.main}>
                  {specification.currencyUnit}
                </Typography>
              }
            />
          </ModalFieldsBox>
          <ModalButtonsBox>
            <ModalButton variant="save" type="submit">
              {t('Save')}
            </ModalButton>
          </ModalButtonsBox>
        </ModalBox>
        <GeneralErrorMessage errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
}
