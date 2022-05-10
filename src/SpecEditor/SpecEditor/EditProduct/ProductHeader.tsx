import React from 'react';
import { useTranslation } from 'react-i18next';
import { DFOCardHeader } from '../../../components/DFOCard/DFOCardHeader';
import { DFOHeaderContentBox } from '../../../components/DFOCard/DFOHeaderContentBox';
import { Box, Typography } from '@mui/material';
import { DFOCardHeaderIconButton } from '../../../components/DFOCard/DFOCardHeaderIconButton';
import { useSpecificationState } from '../../SpecificationContext';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../../store/hooks';

export default function ProductHeader(): React.ReactElement {
  const { t } = useTranslation();
  const { spec } = useAppSelector((state) => state.specification);
  const { specificationProductIndex } = useSpecificationState();

  return (
    <DFOCardHeader>
      <DFOHeaderContentBox>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            paddingBottom: 0.5,
            borderBottom: '1px solid'
          }}
        >
          <Typography variant="lgBold">
            {specificationProductIndex !== -1
              ? spec.products[specificationProductIndex].title
              : t('Generic requirement')}
          </Typography>
          {specificationProductIndex !== -1 && (
            <DFOCardHeaderIconButton
              sx={{ marginLeft: 'auto', paddingRight: 2 }}
            >
              <EditIcon />
            </DFOCardHeaderIconButton>
          )}
        </Box>
        <Typography variant="smBold" sx={{ paddingTop: 1 }}>
          {specificationProductIndex !== -1 &&
            spec.products[specificationProductIndex].description}
        </Typography>
      </DFOHeaderContentBox>
    </DFOCardHeader>
  );
}
