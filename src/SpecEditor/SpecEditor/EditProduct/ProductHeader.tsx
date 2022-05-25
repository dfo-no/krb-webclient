import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DFOCardHeader } from '../../../components/DFOCard/DFOCardHeader';
import { DFOHeaderContentBox } from '../../../components/DFOCard/DFOHeaderContentBox';
import { Box, Typography } from '@mui/material';
import { DFOCardHeaderIconButton } from '../../../components/DFOCard/DFOCardHeaderIconButton';
import { useSpecificationState } from '../../SpecificationContext';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../../store/hooks';
import DFODialog from '../../../components/DFODialog/DFODialog';
import EditProductForm from './EditProductForm';

export default function ProductHeader(): React.ReactElement {
  const { t } = useTranslation();
  const { spec } = useAppSelector((state) => state.specification);
  const { specificationProductIndex } = useSpecificationState();
  const [editingProduct, setEditingProduct] = useState(false);

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
            {spec.products[specificationProductIndex]?.title ??
              t('General requirement')}
          </Typography>
          {specificationProductIndex !== -1 && (
            <DFOCardHeaderIconButton
              sx={{ marginLeft: 'auto', paddingRight: 2 }}
              onClick={() => setEditingProduct(true)}
            >
              <EditIcon />
            </DFOCardHeaderIconButton>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: 1 }}>
          <Typography variant="smBold">
            {spec.products[specificationProductIndex]?.description ?? ''}
          </Typography>

          {specificationProductIndex !== -1 && (
            <Typography
              variant="smBold"
              sx={{ marginLeft: 'auto', paddingRight: 2 }}
            >
              {t('From product type')}
              {': '}
              <i>
                {spec.products[specificationProductIndex].originProduct.title}
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
                specificationProduct={spec.products[specificationProductIndex]}
              />
            }
          />
        )}
      </DFOHeaderContentBox>
    </DFOCardHeader>
  );
}
