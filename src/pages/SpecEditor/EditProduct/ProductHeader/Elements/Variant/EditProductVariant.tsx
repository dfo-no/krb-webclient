import React, { ReactElement, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormContext, useWatch } from 'react-hook-form';

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
  const [awardCriteria, setAwardCriteria] = useState(false);
  const awardCriteriaCheckboxDiscount = useWatch({
    name: 'question.config.discount',
    control,
  });

  const awardCriteriaConfirmationDiscount = useWatch({
    name: 'question.config.discount',
    control,
  });

  const awardCriteriaDateDiscount = useWatch({
    name: 'question.config.dateDiscounts',
    control,
  });

  const awardCriteriaTimeDiscount = useWatch({
    name: 'question.config.timeDiscounts',
    control,
  });

  const awardCriteriaTextDiscount = useWatch({
    name: 'question.config.discountValues',
    control,
  });

  const awardCriteriaSliderDiscount = useWatch({
    name: 'question.config.discountsValue',
    control,
  });

  const handleAwardCriteriaCodesDiscount = (value: boolean) => {
    setAwardCriteria(value);
  };

  const isAwardCriteria = () => {
    return (
      awardCriteriaCheckboxDiscount > 0 ||
      awardCriteriaConfirmationDiscount > 0 ||
      awardCriteriaDateDiscount?.length ||
      awardCriteriaTimeDiscount?.length ||
      awardCriteria ||
      awardCriteriaTextDiscount?.length ||
      awardCriteriaSliderDiscount?.length
    );
  };

  const renderBadge = () => {
    if (variant.type === VariantType.info) {
      return (
        <Badge type={BadgeType.Information} displayText={t('Information')} />
      );
    } else if (isAwardCriteria()) {
      return <Badge type={BadgeType.Award} displayText={t('Award criteria')} />;
    } else if (variant.type === VariantType.requirement) {
      return (
        <Badge
          type={BadgeType.Requirement}
          displayText={t('Mandatory requirement')}
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
      <ProductQuestionList
        variant={variant}
        handleAwardCriteria={handleAwardCriteriaCodesDiscount}
      />
    </Box>
  );
}
