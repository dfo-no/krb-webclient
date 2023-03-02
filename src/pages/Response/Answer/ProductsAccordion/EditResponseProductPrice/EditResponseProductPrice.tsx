import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';

import Nexus from '../../../../../Nexus/Nexus';
import { useSpecificationState } from '../../../../SpecEditor/SpecificationContext';
import { IResponseProduct } from '../../../../../Nexus/entities/IResponseProduct';
import { ModelType } from '../../../../../Nexus/enums';
import VerticalTextCtrl from '../../../../../FormProvider/VerticalTextCtrl';
import GeneralErrorMessage from '../../../../../Form/GeneralErrorMessage';
import css from './EditResponseProductPrice.module.scss';
import { useResponseState } from '../../../ResponseContext';

interface Props {
  responseProduct: IResponseProduct;
}

export default function EditResponseProductPrice({
  responseProduct,
}: Props): ReactElement {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const { editResponseProductPrice } = useResponseState();
  const { specification } = useSpecificationState();

  const methods = useForm<IResponseProduct>({
    resolver: nexus.resolverService.resolver(ModelType.responseProduct),
    defaultValues: responseProduct,
  });

  const handelProductPrice = (put: IResponseProduct) => {
    editResponseProductPrice({
      productId: responseProduct.id,
      price: put.price,
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onBlur={() => handelProductPrice(methods.getValues())}
        autoComplete="off"
        noValidate
      >
        <VerticalTextCtrl
          className={css.Price}
          name="price"
          label={t('Price of product')}
          placeholder={t('Price of product')}
          defaultValue={0}
          children={<span>{specification.currencyUnit}</span>}
        />
        <GeneralErrorMessage errors={methods.formState.errors} />
      </form>
    </FormProvider>
  );
}
