import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from '../../../Stylesheets/EditorFullPage.module.scss';
import { ISpecificationProduct } from '../../../../Nexus/entities/ISpecificationProduct';
import Toolbar from '../../../../components/UI/Toolbar/ToolBar';
import ToolbarItem from '../../../../components/UI/Toolbar/ToolbarItem';
import { Weighting } from '../../../../Nexus/enums';

interface IProps {
  product?: ISpecificationProduct;
  editingProduct: boolean;
}

export default function ProductHeader({
  product,
  editingProduct
}: IProps): React.ReactElement {
  const { t } = useTranslation();

  const renderProductInfoToolbar = (): ReactElement => {
    return (
      <Toolbar gapType={'md'}>
        <ToolbarItem
          primaryText={t('Quantity')}
          secondaryText={`${product?.amount} ${product?.unit}`}
        />
        {product?.weight && (
          <ToolbarItem
            primaryText={t('Weighting')}
            secondaryText={t(`${Weighting[product?.weight]}`)}
          />
        )}
        <ToolbarItem
          primaryText={t('Type')}
          secondaryText={product?.originProduct.title}
        />
      </Toolbar>
    );
  };

  return (
    <div className={css.overview}>
      {product ? (
        <>
          {!editingProduct && renderProductInfoToolbar()}
          {!editingProduct && (
            <Typography variant="sm">{product?.description}</Typography>
          )}
        </>
      ) : (
        <Typography variant="lgBold">{t('General requirements')}</Typography>
      )}
    </div>
  );
}
