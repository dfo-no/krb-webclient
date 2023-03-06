import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';

import Nexus from '../../../../../Nexus/Nexus';
import { useSpecificationState } from '../../../../SpecEditor/SpecificationContext';
import { IResponseProduct } from '../../../../../Nexus/entities/IResponseProduct';
import { ModelType } from '../../../../../Nexus/enums';
import VerticalTextCtrl from '../../../../../FormProvider/VerticalTextCtrl';
import GeneralErrorMessage from '../../../../../Form/GeneralErrorMessage';
import css from './ProductProperties.module.scss';
import { useResponseState } from '../../../ResponseContext';
import Badge, { BadgeType } from '../../../../../components/UI/Badge/Badge';

interface Props {
  responseProduct: IResponseProduct;
}

export default function ProductProperties({
  responseProduct,
}: Props): ReactElement {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const { editResponseProduct } = useResponseState();
  const { specification } = useSpecificationState();

  const methods = useForm<IResponseProduct>({
    resolver: nexus.resolverService.resolver(ModelType.responseProduct),
    defaultValues: responseProduct,
  });

  const handelProductPrice = (put: IResponseProduct) => {
    editResponseProduct(put);
  };

  return (
    <FormProvider {...methods}>
      <form
        onBlur={() => handelProductPrice(methods.getValues())}
        autoComplete="off"
        noValidate
      >
        <div className={css.ProductProperties}>
          <div className={css.heading}>
            <span>{t('Product characteristics')}</span>
            <Badge
              type={BadgeType.Properties}
              displayText={t('Characteristics')}
            />
          </div>
          <div className={css.Content}>
            <div className={css.text}>
              <span>{t('The name of product')}</span>
              <VerticalTextCtrl
                name="title"
                placeholder={t('Name of product')}
                autoFocus
                color={'var(--text-primary-color)'}
              />
            </div>
            <div className={css.text}>
              <span>{t('Description of the product')}</span>
              <div>{t('Enter a short description of the product')}</div>
              <VerticalTextCtrl
                className={css.description}
                name="description"
                placeholder={t('Description of the product')}
                color={'var(--text-primary-color)'}
              />
            </div>
            <div className={css.text}>
              <span>{t('Total price')}</span>
              <div>
                {t(
                  'The price stated here is the total price this number of products can offer Note that all evaluated deductions only form the basis for evaluation, and it is the price stated here that is the actual price you indicate the product will cost'
                )}
              </div>
              <VerticalTextCtrl
                className={css.price}
                name="price"
                placeholder={t('Price of product')}
                defaultValue={0}
                adornment={specification.currencyUnit}
                color={'var(--text-primary-color)'}
              />
            </div>
          </div>

          <GeneralErrorMessage errors={methods.formState.errors} />
        </div>
      </form>
    </FormProvider>
  );
}
