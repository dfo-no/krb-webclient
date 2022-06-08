import { Typography } from '@mui/material';
import theme from '../../../theme';
import React from 'react';
import { IVariant } from '../../../Nexus/entities/IVariant';
import { Box } from '@mui/material/';
import { t } from 'i18next';

interface IProps {
  variant: IVariant;
}

export default function ProductVariant({
  variant
}: IProps): React.ReactElement {
  return (
    <Box>
      <Typography sx={{ marginBottom: 2 }}>{variant.description}</Typography>
      <Typography variant={'smBold'} color={theme.palette.primary.main}>
        {t('Requirement text')}
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        {variant.requirementText ? variant.requirementText : '-'}
      </Typography>
      <Typography variant={'smBold'} color={theme.palette.primary.main}>
        {t('Instruction')}
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        {variant.instruction ? variant.instruction : '-'}
      </Typography>
    </Box>
  );
}
