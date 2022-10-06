import React, { ReactElement, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography } from '@mui/material';

import DeleteSpecProduct from '../DeleteSpecProduct';
import ProductHeader from './ProductHeader';
import { SPECIFICATION } from '../../../../common/PathConstants';
import ProductNeed from './Elements/Needs/ProductNeed';
import Utils from '../../../../common/Utils';
import { useSelectState } from '../../../Workbench/Create/SelectContext';
import { useSpecificationState } from '../../SpecificationContext';
import { IRouteSpecificationParams } from '../../../../models/IRouteSpecificationParams';
import Panel from '../../../../components/UI/Panel/Panel';
import EditProductForm from './EditProductForm';
import Toolbar from '../../../../components/UI/Toolbar/ToolBar';
import ToolbarItem from '../../../../components/UI/Toolbar/ToolbarItem';

export default function EditProduct(): React.ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const { productId } = useParams<IRouteSpecificationParams>();
  const { specification } = useSpecificationState();
  const { setDeleteMode } = useSelectState();
  const [editingProduct, setEditingProduct] = useState(false);

  const product = specification.products.find((prod) => prod.id === productId);

  const onDelete = (): void => {
    setDeleteMode('');
  };
  const toOverviewPage = (): void => {
    if (!editingProduct) {
      history.push(`/${SPECIFICATION}/${specification.id}`);
    }
  };

  const renderProductActionsToolbar = (): ReactElement => {
    return (
      <Toolbar gapType={'lg'} hasPadding={true}>
        <ToolbarItem
          primaryText={t('Edit product')}
          icon={<EditIcon />}
          handleClick={() => setEditingProduct(true)}
        />
        {product?.id && (
          <ToolbarItem
            primaryText={t('Delete product')}
            icon={<DeleteIcon />}
            handleClick={() => setDeleteMode(product?.id)}
          />
        )}
      </Toolbar>
    );
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
        {!editingProduct && (
          <Typography variant="lgBold">{product?.title}</Typography>
        )}
        {!editingProduct && renderProductActionsToolbar()}
        <ProductHeader product={product} editingProduct={editingProduct} />
        {product && editingProduct && (
          <EditProductForm
            handleClose={() => setEditingProduct(false)}
            specificationProduct={product}
          />
        )}
        {renderNeeds()}
        <Panel
          sticky={true}
          panelColor={'white'}
          children={
            <>
              <Button
                variant="cancel"
                onClick={toOverviewPage}
                disabled={editingProduct}
                sx={{ backgroundColor: editingProduct ? '#d1d1d1' : '' }}
              >
                {t('Cancel')}
              </Button>
              <Button
                variant="primary"
                onClick={toOverviewPage}
                disabled={editingProduct}
                sx={{ backgroundColor: editingProduct ? '#d1d1d1' : '' }}
              >
                {t('Save product')}
              </Button>
            </>
          }
        />
      </div>
    </DeleteSpecProduct>
  );
}
