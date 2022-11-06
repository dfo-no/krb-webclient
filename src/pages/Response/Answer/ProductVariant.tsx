import React from 'react';
import { Box, Typography } from '@mui/material/';
import { t } from 'i18next';

import css from './ProductRequirementAnswer.module.scss';
import theme from '../../../theme';
import { IVariant } from '../../../Nexus/entities/IVariant';

interface IProps {
  variant: IVariant;
}

export default function ProductVariant({
  variant,
}: IProps): React.ReactElement {
  return (
    <Box>
      <Typography className={css.label}>{variant.description}</Typography>
      <Typography variant={'smBold'} color={theme.palette.primary.main}>
        {t('Requirement text')}
      </Typography>
      <Typography className={css.label}>
        {variant.requirementText ? variant.requirementText : '-'}
      </Typography>
      <Typography variant={'smBold'} color={theme.palette.primary.main}>
        {t('Instruction')}
      </Typography>
      {variant.instruction && (
        <Typography className={css.label}>{variant.instruction}</Typography>
      )}
    </Box>
  );
}
