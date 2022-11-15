import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';

export default function ProductHeader(): React.ReactElement {
  const { t } = useTranslation();
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );
  const { productIndex } = useProductIndexState();

  const productDescription =
    prefilledResponse.products[productIndex]?.description;

  const originProduct = prefilledResponse.products[productIndex]?.originProduct;

  return (
    <>
      <Typography variant="lgBold">
        {prefilledResponse.products[productIndex]?.title ??
          t('General requirement')}
      </Typography>
      {productIndex !== -1 && originProduct && (
        <ToolbarItem
          primaryText={t('From product type')}
          secondaryText={originProduct.title}
        />
      )}
      {productDescription && (
        <Typography variant="md">{productDescription}</Typography>
      )}
    </>
  );
}
