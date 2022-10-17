import React from 'react';
import { Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from '../../Stylesheets/EditorFullPage.module.scss';
import { DFOCardHeader } from '../../../components/DFOCard/DFOCardHeader';
import { DFOHeaderContentBox } from '../../../components/DFOCard/DFOHeaderContentBox';
import { useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import theme from '../../../theme';

export default function ProductHeader(): React.ReactElement {
  const { t } = useTranslation();
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );
  const { productIndex } = useProductIndexState();

  const productDescription =
    prefilledResponse.products[productIndex]?.description;

  return (
    <DFOCardHeader>
      <DFOHeaderContentBox>
        <div className={css.HeaderTop}>
          <Typography variant="lgBold">
            {prefilledResponse.products[productIndex]?.title ??
              t('General requirement')}
          </Typography>
        </div>
        {productDescription && (
          <>
            <Divider color={theme.palette.white.main} />
            <div className={css.HeaderBottom}>
              <Typography variant="smBold">
                {productDescription ?? ''}
              </Typography>
            </div>
          </>
        )}
      </DFOHeaderContentBox>
    </DFOCardHeader>
  );
}
