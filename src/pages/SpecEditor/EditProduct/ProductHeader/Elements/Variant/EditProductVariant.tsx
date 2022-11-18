import React, { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormContext, useWatch } from 'react-hook-form';
import Tune from '@mui/icons-material/Tune';

import css from './EditProductVariant.module.scss';
import ProductQuestionList from '../QuestionList/ProductQuestionList';
import { IRequirement } from '../../../../../../Nexus/entities/IRequirement';
import { IVariant } from '../../../../../../Nexus/entities/IVariant';
import { VariantType } from '../../../../../../Nexus/enums';
import Badge, { BadgeType } from '../../../../../../components/UI/Badge/Badge';
import { IRequirementAnswer } from '../../../../../../Nexus/entities/IRequirementAnswer';
import GuidanceText from '../../../../../../components/UI/GuidanceText/GuidanceText';

interface IProps {
  requirement: IRequirement;
  variant: IVariant;
}

export default function EditProductVariant({ variant }: IProps): ReactElement {
  const { t } = useTranslation();
  const { control } = useFormContext<IRequirementAnswer>();
  const awardCriteriaDiscount = useWatch({
    name: 'question.config.pointsNonPrefered',
    control,
  });

  const awardCriteriaUnConfirmedDiscount = useWatch({
    name: 'question.config.pointsUnconfirmed',
    control,
  });

  const isAwardCriteria = () => {
    return awardCriteriaDiscount > 0 || awardCriteriaUnConfirmedDiscount > 0;
  };

  const questionsTypeCodeList = () => {
    return variant.questions.filter((q) => q.type === 'Q_CODELIST');
  };

  const renderBadge = () => {
    if (variant.type === VariantType.info) {
      return (
        <Badge type={BadgeType.Information} displayText={t('Information')} />
      );
    } else if (isAwardCriteria()) {
      return <Badge type={BadgeType.Award} displayText={t('Award criteria')} />;
    } else if (
      variant.type === VariantType.requirement &&
      questionsTypeCodeList().length === 0
    ) {
      return (
        <Badge
          type={BadgeType.Requirement}
          displayText={t('Mandatory requirement')}
        />
      );
    } else if (
      variant.type === VariantType.requirement &&
      questionsTypeCodeList().length > 0
    ) {
      return (
        <Badge
          type={BadgeType.CombinationRequirements}
          icon={<Tune />}
          displayText={t('Combination requirements')}
        />
      );
    }
  };

  return (
    <Box className={css.EditProductVariant}>
      <Box className={css.titleRow}>
        <Typography variant={'mdBold'}>{variant.description}</Typography>
        {renderBadge()}
      </Box>
      {variant.requirementText && (
        <Typography className={css.infoText}>
          {variant.requirementText}
        </Typography>
      )}
      {variant.instruction && <GuidanceText text={variant.instruction} />}
      <ProductQuestionList variant={variant} />
    </Box>
  );
}
