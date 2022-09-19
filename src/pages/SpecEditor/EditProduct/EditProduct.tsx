import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DeleteSpecProduct from './DeleteSpecProduct';
import ProductHeader from './ProductHeader';
import ProductNeed from './ProductNeed';
import Utils from '../../../common/Utils';
import { IRouteSpecificationParams } from '../../../models/IRouteSpecificationParams';
import { useSelectState } from '../../Workbench/Create/SelectContext';
import { useSpecificationState } from '../SpecificationContext';
import { Button } from '@mui/material';
import { SPECIFICATION } from '../../../common/PathConstants';
import { useTranslation } from 'react-i18next';
import css from '../../Stylesheets/Editor.module.scss';

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
    history.push(`/${SPECIFICATION}/${specification.id}/create/`);
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
        <div className={css.Button}>
          <Button variant="primary" onClick={toOverviewPage}>
            {t('Save')}
          </Button>
        </div>
      </div>
    </DeleteSpecProduct>
  );
}
