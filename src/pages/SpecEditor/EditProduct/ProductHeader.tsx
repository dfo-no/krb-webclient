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
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import { useSelectState } from '../../Workbench/Create/SelectContext';
import { useSpecificationState } from '../SpecificationContext';

export default function ProductHeader(): React.ReactElement {
  const { t } = useTranslation();
  const { specification } = useSpecificationState();
  const { productIndex } = useProductIndexState();
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
            {specification.products[productIndex]?.title ??
              t('General requirement')}
          </Typography>
          {productIndex !== -1 && (
            <>
              <DFOCardHeaderIconButton
                sx={{ marginLeft: 'auto', paddingRight: 2 }}
                onClick={() => setEditingProduct(true)}
              >
                <EditIcon />
              </DFOCardHeaderIconButton>
              <DFOCardHeaderIconButton
                hoverColor={theme.palette.errorRed.main}
                onClick={() =>
                  setDeleteMode(specification.products[productIndex].id)
                }
              >
                <DeleteIcon />
              </DFOCardHeaderIconButton>
            </>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: 1 }}>
          <Typography variant="smBold">
            {specification.products[productIndex]?.description ?? ''}
          </Typography>

          {productIndex !== -1 &&
            specification.products[productIndex].originProduct && (
              <Typography
                variant="smBold"
                sx={{ marginLeft: 'auto', paddingRight: 2 }}
              >
                {t('From product type')}
                {': '}
                <i>
                  {specification.products[productIndex].originProduct.title}
                </i>
              </Typography>
            )}
        </Box>
        {editingProduct && (
          <DFODialog
            isOpen={true}
            handleClose={() => setEditingProduct(false)}
            children={
              <EditProductForm
                handleClose={() => setEditingProduct(false)}
                specificationProduct={specification.products[productIndex]}
              />
            }
          />
        )}
      </DFOHeaderContentBox>
    </DFOCardHeader>
  );
}
