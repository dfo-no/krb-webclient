import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from '../../Stylesheets/Editor.module.scss';
import { DFOCardHeader } from '../../../components/DFOCard/DFOCardHeader';
import { DFOHeaderContentBox } from '../../../components/DFOCard/DFOHeaderContentBox';
import { useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';

export default function ProductHeader(): React.ReactElement {
  const { t } = useTranslation();
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );
  const { productIndex } = useProductIndexState();

  return (
    <DFOCardHeader>
      <DFOHeaderContentBox>
        <div className={css.HeaderTop}>
          <Typography variant="lgBold">
            {prefilledResponse.products[productIndex]?.title ??
              t('General requirement')}
          </Typography>
        </div>
        <div className={css.HeaderBottom}>
          <Typography variant="smBold">
            {prefilledResponse.products[productIndex]?.description ?? ''}
          </Typography>
        </div>
      </DFOHeaderContentBox>
    </DFOCardHeader>
  );
}
