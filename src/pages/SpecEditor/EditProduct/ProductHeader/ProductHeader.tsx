import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

import DFODialog from '../../../../components/DFODialog/DFODialog';
import EditProductForm from './EditProductForm';
import theme from '../../../../theme';
import { DFOCardHeader } from '../../../../components/DFOCard/DFOCardHeader';
import { DFOCardHeaderIconButton } from '../../../../components/DFOCard/DFOCardHeaderIconButton';
import { DFOHeaderContentBox } from '../../../../components/DFOCard/DFOHeaderContentBox';
import { useProductIndexState } from '../../../../components/ProductIndexContext/ProductIndexContext';
import { useSelectState } from '../../../Workbench/Create/SelectContext';
import { useSpecificationState } from '../../SpecificationContext';
import css from './ProductHeader.module.scss';
import { ISpecificationProduct } from '../../../../Nexus/entities/ISpecificationProduct';
import { GeneralProductEditForm } from './GeneralProductEditForm';

interface IProps {
  product?: ISpecificationProduct;
}

export default function ProductHeader({ product }: IProps): React.ReactElement {
  const { t } = useTranslation();
  const { specification } = useSpecificationState();
  const { productIndex } = useProductIndexState();
  const [editingProduct, setEditingProduct] = useState(false);
  const [editingSpec, setEditingSpec] = useState(false);
  const { setDeleteMode } = useSelectState();

  return (
    <div className={css.HeaderWrapper}>
      <DFOCardHeader>
        <DFOHeaderContentBox>
          <Box className={css.HeaderBox}>
            <Typography variant="lgBold">
              {product?.title ?? t('General requirement')}
            </Typography>
            {!product && productIndex === -1 && (
              <DFOCardHeaderIconButton
                className={css.HeaderBox__generalEditIcon}
                onClick={() => setEditingSpec(true)}
              >
                <EditIcon />
              </DFOCardHeaderIconButton>
            )}
            {product && (
              <>
                <DFOCardHeaderIconButton
                  className={css.HeaderBox__productEditIcon}
                  onClick={() => setEditingProduct(true)}
                >
                  <EditIcon />
                </DFOCardHeaderIconButton>
                <DFOCardHeaderIconButton
                  hoverColor={theme.palette.errorRed.main}
                  onClick={() => setDeleteMode(product.id)}
                >
                  <DeleteIcon />
                </DFOCardHeaderIconButton>
              </>
            )}
          </Box>
          <Box className={css.Description}>
            <Typography variant="smBold">
              {product?.description ?? ''}
            </Typography>

            {productIndex !== -1 && product?.originProduct && (
              <Typography
                variant="smBold"
                sx={{ marginLeft: 'auto', paddingRight: 2 }}
              >
                {t('From product type')}
                {': '}
                <i>{product.originProduct.title}</i>
              </Typography>
            )}
          </Box>
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
        </DFOHeaderContentBox>
      </DFOCardHeader>
      {!product && editingSpec && (
        <DFODialog
          isOpen={true}
          handleClose={() => setEditingSpec(false)}
          children={
            <GeneralProductEditForm
              specification={specification}
              handleClose={() => setEditingSpec(false)}
            />
          }
        />
      )}
    </div>
  );
}
