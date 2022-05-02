import React from 'react';
import { useTranslation } from 'react-i18next';
import HorizontalTextCtrl from '../../FormProvider/HorizontalTextCtrl';
import { DFOCardHeader } from '../../components/DFOCard/DFOCardHeader';
import { DFOHeaderContentBox } from '../../components/DFOCard/DFOHeaderContentBox';

export default function NewProductHeader(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <DFOCardHeader>
      <DFOHeaderContentBox sx={{ padding: 4, paddingLeft: 16, gap: 2 }}>
        <HorizontalTextCtrl name="title" placeholder={t('name of product')} />
        <HorizontalTextCtrl
          name="description"
          placeholder={t('description of the product')}
        />
      </DFOHeaderContentBox>
    </DFOCardHeader>
  );
}
