import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DeleteSpecProduct from '../DeleteSpecProduct';
import ProductHeader from './ProductHeader';
import { Button } from '@mui/material';
import { SPECIFICATION } from '../../../../common/PathConstants';
import ProductNeed from './Elements/Needs/ProductNeed';
import Utils from '../../../../common/Utils';
import { useSelectState } from '../../../Workbench/Create/SelectContext';
import { useSpecificationState } from '../../SpecificationContext';
import { IRouteSpecificationParams } from '../../../../models/IRouteSpecificationParams';
import Panel from '../../../../components/UI/Panel/Panel';

export default function EditProduct(): React.ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const { productId } = useParams<IRouteSpecificationParams>();
  const { specification } = useSpecificationState();
  const { setDeleteMode } = useSelectState();

  const product = specification.products.find((prod) => prod.id === productId);

  const onDelete = (): void => {
    setDeleteMode('');
  };
  const toOverviewPage = (): void => {
    history.push(`/${SPECIFICATION}/${specification.id}`);
  };
  const renderNeeds = () => {
    const needs = product
      ? Utils.findVariantsUsedByProduct(
          product.originProduct,
          specification.bank
        )
      : Utils.findVariantsUsedBySpecification(specification.bank);
    return needs.map((need) => {
      return <ProductNeed key={need.id} need={need} product={product} />;
    });
  };

  return (
    <DeleteSpecProduct product={product} handleClose={onDelete}>
      <div>
        <ProductHeader product={product} />
        {renderNeeds()}
        <Panel
          sticky={true}
          panelColor={'white'}
          children={
            <Button variant="primary" onClick={toOverviewPage}>
              {t('Save')}
            </Button>
          }
        />
      </div>
    </DeleteSpecProduct>
  );
}
