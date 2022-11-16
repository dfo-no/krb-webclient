import React, { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useFormContext, useWatch } from 'react-hook-form';

import css from './EditProductVariant.module.scss';
import ProductQuestionList from '../QuestionList/ProductQuestionList';
import theme from '../../../../../../theme';
import { IRequirement } from '../../../../../../Nexus/entities/IRequirement';
import { IVariant } from '../../../../../../Nexus/entities/IVariant';
import { VariantType } from '../../../../../../Nexus/enums';
import Badge from '../../../../../../components/UI/Badge/Badge';
import { IRequirementAnswer } from '../../../../../../Nexus/entities/IRequirementAnswer';

interface IProps {
  requirement: IRequirement;
  variant: IVariant;
}

export default function EditProductVariant({ variant }: IProps): ReactElement {
  const { t } = useTranslation();
  const { control } = useFormContext<IRequirementAnswer>();
  const pointsNonPrefered = useWatch({
    name: 'question.config.pointsNonPrefered',
    control,
  });

  const pointsUnconfirmed = useWatch({
    name: 'question.config.pointsUnconfirmed',
    control,
  });

  const questionsType = () => {
    return variant.questions.filter((q) => q.type === 'Q_CODELIST');
  };

  const renderBadge = () => {
    if (variant.type === VariantType.info) {
      return (
        <Badge
          type={'information'}
          icon={<InfoOutlinedIcon />}
          displayText={t('Information')}
        />
      );
    } else if (pointsNonPrefered > 0 || pointsUnconfirmed > 0) {
      return (
        <Badge
          type={'award'}
          icon={<InfoOutlinedIcon />}
          displayText={t('Award criteria')}
        />
      );
    } else if (
      variant.type === VariantType.requirement &&
      questionsType().length === 0
    ) {
      return (
        <Badge
          type={'requirement'}
          icon={<InfoOutlinedIcon />}
          displayText={t('Absolute requirement')}
        />
      );
    } else if (
      variant.type === VariantType.requirement &&
      questionsType().length > 0
    ) {
      return (
        <Badge
          type={'combinationRequirements'}
          icon={<InfoOutlinedIcon />}
          displayText={t('Combination requirements')}
        />
      );
    }
  };

  return (
    <Box className={css.EditProductVariant}>
      <Box className={css.titleRow}>
        <Typography variant={'lg'} className={css.title}>
          {variant.description}
        </Typography>
        {renderBadge()}
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
