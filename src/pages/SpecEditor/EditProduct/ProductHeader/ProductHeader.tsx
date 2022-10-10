import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from '../../../Stylesheets/EditorFullPage.module.scss';
import { ISpecificationProduct } from '../../../../Nexus/entities/ISpecificationProduct';
import Toolbar from '../../../../components/UI/Toolbar/ToolBar';
import ToolbarItem from '../../../../components/UI/Toolbar/ToolbarItem';
import { Weighting } from '../../../../Nexus/enums';
import Utils from '../../../../common/Utils';
import { useSpecificationState } from '../../SpecificationContext';

interface IProps {
  product?: ISpecificationProduct;
  editingProduct: boolean;
}

export default function ProductHeader({
  product,
  editingProduct
}: IProps): React.ReactElement {
  const { t } = useTranslation();
  const { specification } = useSpecificationState();

  const chosenRequirements = (specProduct: ISpecificationProduct): string => {
    const needs = Utils.findVariantsUsedByProduct(
      specProduct.originProduct,
      specification.bank
    );
    const totalProductRequirements = needs
      .map((need) => need.requirements.length)
      .reduce((previousValue, currentValue) => previousValue + currentValue);
    const answeredRequirements = specProduct?.requirements.length;
    return `${answeredRequirements}/${totalProductRequirements}`;
  };

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
        {product && (
          <ToolbarItem
            primaryText={t('Chosen requirements')}
            secondaryText={chosenRequirements(product)}
          />
        )}
      </Toolbar>
    );
  };

  return (
    <div className={css.overview}>
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
