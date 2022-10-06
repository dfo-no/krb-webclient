import React, { ReactElement, useState } from 'react';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

import DFODialog from '../../../../components/DFODialog/DFODialog';
import EditProductForm from './EditProductForm';
import { useSelectState } from '../../../Workbench/Create/SelectContext';
import css from '../../../Stylesheets/EditorFullPage.module.scss';
import { ISpecificationProduct } from '../../../../Nexus/entities/ISpecificationProduct';
import Toolbar from '../../../../components/UI/Toolbar/ToolBar';
import ToolbarItem from '../../../../components/UI/Toolbar/ToolbarItem';
import { Weighting } from '../../../../Nexus/enums';

interface IProps {
  product?: ISpecificationProduct;
}

export default function ProductHeader({ product }: IProps): React.ReactElement {
  const { t } = useTranslation();
  const [editingProduct, setEditingProduct] = useState(false);
  const { setDeleteMode } = useSelectState();

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
          <Typography variant="lgBold">{product?.title}</Typography>
          {renderProductActionsToolbar()}
          {renderProductInfoToolbar()}
          <Typography variant="md">{product?.description}</Typography>
        </>
      ) : (
        <Typography variant="lgBold">{t('General requirements')}</Typography>
      )}
      {product && editingProduct && (
        <DFODialog
          isOpen={true}
          handleClose={() => setEditingProduct(false)}
          children={
            <EditProductForm
              handleClose={() => setEditingProduct(false)}
              specificationProduct={product}
            />
          }
        />
      )}
    </div>
  );
}
