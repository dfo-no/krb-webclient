import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { DFOCardHeader } from '../../../components/DFOCard/DFOCardHeader';
import { DFOHeaderContentBox } from '../../../components/DFOCard/DFOHeaderContentBox';
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
            borderBottom: '0.1rem solid'
          }}
        >
          <Typography variant="lgBold">
            {response.specification.products[responseProductIndex]?.title ??
              t('General requirement')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', paddingTop: 1 }}>
          <Typography variant="smBold">
            {response.specification.products[responseProductIndex]
              ?.description ?? ''}
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
                  response.specification.products[responseProductIndex]
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
