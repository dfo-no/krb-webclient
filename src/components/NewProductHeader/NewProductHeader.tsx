import React from 'react';
import { useTranslation } from 'react-i18next';

import css from '../../pages/Stylesheets/NewProduct.module.scss';
import HorizontalTextCtrl from '../../FormProvider/HorizontalTextCtrl';
import { DFOCardHeader } from '../DFOCard/DFOCardHeader';
import { DFOHeaderContentBox } from '../DFOCard/DFOHeaderContentBox';

export default function NewProductHeader(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <DFOCardHeader>
      <DFOHeaderContentBox className={css.HeaderContent}>
        <HorizontalTextCtrl name="title" placeholder={t('Name of product')} />
        <HorizontalTextCtrl
          name="description"
          placeholder={t('Description of the product')}
        />
      </DFOHeaderContentBox>
    </DFOCardHeader>
  );
}
