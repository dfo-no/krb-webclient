import React, { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from './EditProductVariant.module.scss';
import ProductQuestionList from '../QuestionList/ProductQuestionList';
import theme from '../../../../../../theme';
import { DFOChip } from '../../../../../../components/DFOChip/DFOChip';
import { IRequirement } from '../../../../../../Nexus/entities/IRequirement';
import { IVariant } from '../../../../../../Nexus/entities/IVariant';
import { VariantType } from '../../../../../../Nexus/enums';

interface IProps {
  requirement: IRequirement;
  variant: IVariant;
}

export default function EditProductVariant({ variant }: IProps): ReactElement {
  const { t } = useTranslation();

  return (
    <Box className={css.EditProductVariant}>
      <Box className={css.titleRow}>
        <Typography variant={'lg'} className={css.title}>
          {variant.description}
        </Typography>
        <Box className={css.slider}>
          {variant.type === VariantType.info && (
            <DFOChip label={t('Info')} sx={{ marginLeft: 'auto' }} />
          )}
        </Box>
      </Box>
      <Typography variant={'smBold'} color={theme.palette.primary.main}>
        {t('Requirement text')}
      </Typography>
      <Typography className={css.infoText}>
        {variant.requirementText ? variant.requirementText : '-'}
      </Typography>
      {variant.instruction && (
        <>
          <Typography variant={'smBold'} color={theme.palette.primary.main}>
            {t('Instruction')}
          </Typography>
          <Typography className={css.infoText}>
            {variant.instruction}
          </Typography>
        </>
      )}
      <ProductQuestionList variant={variant} />
    </Box>
  );
}
