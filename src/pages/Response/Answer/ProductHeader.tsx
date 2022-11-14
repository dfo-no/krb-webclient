import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';

export default function ProductHeader(): React.ReactElement {
  const { t } = useTranslation();
  const { response } = useAppSelector((state) => state.response);
  const { productIndex } = useProductIndexState();

  const description =
    response.specification.products[productIndex]?.description;
  const originProduct =
    response.specification.products[productIndex]?.originProduct;
  return (
    <>
      <Typography variant="lgBold">
        {response.specification.products[productIndex]?.title ??
          t('General requirement')}
      </Typography>
      {productIndex !== -1 && originProduct && (
        <ToolbarItem
          primaryText={t('From product type')}
          secondaryText={originProduct.title}
        />
      )}
      {description && <Typography variant="md">{description}</Typography>}
    </>
  );
}
