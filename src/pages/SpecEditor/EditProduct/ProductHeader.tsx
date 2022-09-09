import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import DFODialog from '../../../components/DFODialog/DFODialog';
import EditProductForm from './EditProductForm';
import { DFOCardHeader } from '../../../components/DFOCard/DFOCardHeader';
import { DFOCardHeaderIconButton } from '../../../components/DFOCard/DFOCardHeaderIconButton';
import { DFOHeaderContentBox } from '../../../components/DFOCard/DFOHeaderContentBox';
import { useAppSelector } from '../../../store/hooks';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import theme from '../../../theme';
import DeleteSpecProduct from './DeleteSpecProduct';
import { useSelectState } from '../../Workbench/Create/SelectContext';

export default function ProductHeader(): React.ReactElement {
  const { t } = useTranslation();
  const { spec } = useAppSelector((state) => state.specification);
  const { productIndex } = useProductIndexState();
  const [editingProduct, setEditingProduct] = useState(false);
  const { setDeleteMode } = useSelectState();

  const onDelete = (): void => {
    setDeleteMode('');
  };

  return (
    <DFOCardHeader>
      <DFOHeaderContentBox>
        <DeleteSpecProduct product={spec.products} handleClose={onDelete}>
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                paddingBottom: 0.5,
                borderBottom: '0.1rem solid'
              }}
            >
              <Typography variant="lgBold">
                {spec.products[productIndex]?.title ?? t('General requirement')}
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
                      setDeleteMode(spec.products[productIndex].id)
                    }
                  >
                    <DeleteIcon />
                  </DFOCardHeaderIconButton>
                </>
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: 1 }}>
              <Typography variant="smBold">
                {spec.products[productIndex]?.description ?? ''}
              </Typography>

              {productIndex !== -1 &&
                spec.products[productIndex].originProduct && (
                  <Typography
                    variant="smBold"
                    sx={{ marginLeft: 'auto', paddingRight: 2 }}
                  >
                    {t('From product type')}
                    {': '}
                    <i>{spec.products[productIndex].originProduct.title}</i>
                  </Typography>
                )}
            </Box>
          </>
        </DeleteSpecProduct>
        {editingProduct && (
          <DFODialog
            isOpen={true}
            handleClose={() => setEditingProduct(false)}
            children={
              <EditProductForm
                handleClose={() => setEditingProduct(false)}
                specificationProduct={spec.products[productIndex]}
              />
            }
          />
        )}
      </DFOHeaderContentBox>
    </DFOCardHeader>
  );
}
