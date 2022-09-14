import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import DFODialog from '../../../components/DFODialog/DFODialog';
import EditProductForm from './EditProductForm';
import theme from '../../../theme';
import { DFOCardHeader } from '../../../components/DFOCard/DFOCardHeader';
import { DFOCardHeaderIconButton } from '../../../components/DFOCard/DFOCardHeaderIconButton';
import { DFOHeaderContentBox } from '../../../components/DFOCard/DFOHeaderContentBox';
import { ISpecificationProduct } from '../../../Nexus/entities/ISpecificationProduct';
import { useSelectState } from '../../Workbench/Create/SelectContext';

interface IProps {
  product?: ISpecificationProduct;
}

export default function ProductHeader({ product }: IProps): React.ReactElement {
  const { t } = useTranslation();
  const [editingProduct, setEditingProduct] = useState(false);
  const { setDeleteMode } = useSelectState();

  return (
    <DFOCardHeader>
      <DFOHeaderContentBox>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            paddingBottom: 0.5,
            borderBottom: '0.1rem solid'
          }}
        >
          <Typography variant="lgBold">
            {product?.title ?? t('General requirement')}
          </Typography>
          {product && (
            <>
              <DFOCardHeaderIconButton
                sx={{ marginLeft: 'auto', paddingRight: 2 }}
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
        <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: 1 }}>
          <Typography variant="smBold">{product?.description ?? ''}</Typography>

          {product?.originProduct && (
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
  );
}
