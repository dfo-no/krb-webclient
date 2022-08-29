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
  const { response } = useAppSelector((state) => state.response);
  const { productIndex } = useProductIndexState();

  return (
    <DFOCardHeader>
      <DFOHeaderContentBox>
        <div className={css.HeaderTop}>
          <Typography variant="lgBold">
            {response.specification.products[productIndex]?.title ??
              t('General requirement')}
          </Typography>
        </div>
        <div className={css.HeaderBottom}>
          <Typography variant="smBold">
            {response.specification.products[productIndex]?.description ?? ''}
          </Typography>

          {productIndex !== -1 && (
            <Typography className={css.ProductType} variant="smBold">
              {t('From product type')}
              {': '}
              <i>
                {
                  response.specification.products[productIndex].originProduct
                    .title
                }
              </i>
            </Typography>
          )}
        </div>
      </DFOHeaderContentBox>
    </DFOCardHeader>
  );
}
