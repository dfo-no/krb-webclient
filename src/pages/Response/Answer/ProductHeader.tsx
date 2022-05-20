import React from 'react';
import { useTranslation } from 'react-i18next';
import { DFOCardHeader } from '../../../components/DFOCard/DFOCardHeader';
import { DFOHeaderContentBox } from '../../../components/DFOCard/DFOHeaderContentBox';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../../store/hooks';
import { useResponseState } from '../ResponseContext';

export default function ProductHeader(): React.ReactElement {
  const { t } = useTranslation();
  const { response } = useAppSelector((state) => state.response);
  const { responseProductIndex } = useResponseState();

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
            {responseProductIndex !== -1
              ? response.spesification.products[responseProductIndex].title
              : t('General requirement')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: 1 }}>
          <Typography variant="smBold">
            {responseProductIndex !== -1 &&
              response.spesification.products[responseProductIndex].description}
          </Typography>

          {responseProductIndex !== -1 && (
            <Typography
              variant="smBold"
              sx={{ marginLeft: 'auto', paddingRight: 2 }}
            >
              {t('From product type')}
              {': '}
              <i>
                {
                  response.spesification.products[responseProductIndex]
                    .originProduct.title
                }
              </i>
            </Typography>
          )}
        </Box>
      </DFOHeaderContentBox>
    </DFOCardHeader>
  );
}
