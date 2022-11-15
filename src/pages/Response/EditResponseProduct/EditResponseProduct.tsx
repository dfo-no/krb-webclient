import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import Nexus from '../../../Nexus/Nexus';
import { useSpecificationState } from '../../SpecEditor/SpecificationContext';
import { IResponseProduct } from '../../../Nexus/entities/IResponseProduct';
import { ModelType } from '../../../Nexus/enums';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import theme from '../../../theme';
import GeneralErrorMessage from '../../../Form/GeneralErrorMessage';
import { editResponseProduct } from '../../../store/reducers/response-reducer';
import css from '../../Stylesheets/EditorFullPage.module.scss';

type Props = {
  productIndex: number;
};

export default function EditResponseProduct({
  productIndex,
}: Props): ReactElement {
  const { t } = useTranslation();
  const { response } = useAppSelector((state) => state.response);
  const nexus = Nexus.getInstance();
  const { specification } = useSpecificationState();
  const dispatch = useAppDispatch();

  const methods = useForm<IResponseProduct>({
    resolver: nexus.resolverService.resolver(ModelType.responseProduct),
    defaultValues: response.products[productIndex],
  });

  const handelProductPrice = (put: IResponseProduct) => {
    dispatch(editResponseProduct(put));
  };

  return (
    <FormProvider {...methods}>
      <form
        onBlur={methods.handleSubmit(handelProductPrice)}
        autoComplete="off"
        noValidate
      >
        <VerticalTextCtrl
          className={css.Price}
          name="price"
          label={t('Price of product')}
          placeholder={t('Price of product')}
          children={
            <Typography color={theme.palette.primary.main}>
              {specification.currencyUnit}
            </Typography>
          }
        />
        <GeneralErrorMessage errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
}
