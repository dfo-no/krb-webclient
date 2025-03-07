import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from './ProductHeader.module.scss';
import { ISpecificationProduct } from '../../../../Nexus/entities/ISpecificationProduct';
import Toolbar from '../../../../components/UI/Toolbar/ToolBar';
import ToolbarItem from '../../../../components/UI/Toolbar/ToolbarItem';
import { useSpecificationState } from '../../SpecificationContext';
import { chosenRequirements } from '../../SpecificationOverview/SpecificationOverview';

interface IProps {
  product?: ISpecificationProduct;
  editingProduct: boolean;
}

export default function ProductHeader({
  product,
  editingProduct,
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const { specification } = useSpecificationState();

  const renderProductInfoToolbar = (): ReactElement => {
    const hasRequirements =
      product && chosenRequirements(specification, product) !== undefined;
    return (
      <Toolbar gapType={'md'}>
        <ToolbarItem
          primaryText={t('Quantity')}
          secondaryText={`${product?.amount} ${product?.unit}`}
        />
        <ToolbarItem
          primaryText={t('Type')}
          secondaryText={product?.originProduct.title}
        />
        {hasRequirements && (
          <ToolbarItem
            dataCy={'chosen-requirements'}
            primaryText={t('Chosen requirements')}
            secondaryText={chosenRequirements(specification, product)}
          />
        )}
      </Toolbar>
    );
  };

  return (
    <div className={css.ProductHeader}>
      {product ? (
        <>
          {!editingProduct && renderProductInfoToolbar()}
          {!editingProduct && (
            <Typography variant="md">{product?.description}</Typography>
          )}
        </>
      ) : (
        <Typography variant="lgBold">{t('General requirements')}</Typography>
      )}
    </div>
  );
}
