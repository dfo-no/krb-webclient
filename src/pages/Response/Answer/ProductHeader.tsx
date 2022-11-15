import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';
import Toolbar from '../../../components/UI/Toolbar/ToolBar';
import { CombinedProductOrGeneral, GENERAL } from '../ResponseModule';

type Props = {
  product: CombinedProductOrGeneral;
};

export default function ProductHeader({ product }: Props): React.ReactElement {
  const { t } = useTranslation();

  if (product === GENERAL) {
    return <Typography variant="lgBold">{t('General requirement')}</Typography>;
  } else {
    const description = product.specificationProduct.description;
    const originProduct = product.specificationProduct.originProduct;
    return (
      <>
        <Typography variant="lgBold">
          {product.specificationProduct.title}
        </Typography>
        <Toolbar gapType={'md'}>
          <ToolbarItem primaryText={description} />
          <ToolbarItem
            primaryText={t('From product type')}
            secondaryText={originProduct.title}
          />
        </Toolbar>
      </>
    );
  }
}
