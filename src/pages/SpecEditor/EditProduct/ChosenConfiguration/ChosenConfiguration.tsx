import React from 'react';
import { Box, Typography } from '@mui/material';
import { t } from 'i18next';

import TextUtils from '../../../../common/TextUtils';
import theme from '../../../../theme';
import { IRequirement } from '../../../../Nexus/entities/IRequirement';
import { useAppSelector } from '../../../../store/hooks';
import { useSpecificationState } from '../../SpecificationContext';
import { VariantType } from '../../../../Nexus/enums';

interface IProps {
  requirement: IRequirement;
}

export default function ChosenConfiguration({
  requirement
}: IProps): React.ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const { specificationProductIndex } = useSpecificationState();

  const requirementAnswer = (
    specificationProductIndex === -1
      ? spec
      : spec.products[specificationProductIndex]
  ).requirementAnswers.find(
    (reqAns) => reqAns.requirement.id === requirement.id
  );

  if (!requirementAnswer) {
    return <></>;
  }

  const reqAnsVariant = requirementAnswer.requirement.variants.find(
    (variant) => variant.id === requirementAnswer.variantId
  );
  const showAnswer = reqAnsVariant && reqAnsVariant.type === VariantType.info;

  return (
    <Box>
      <Typography variant={'sm'} color={theme.palette.gray600.main}>
        {showAnswer ? `${t('Answer')}: ` : `${t('Chosen')}: `}
      </Typography>
      <Typography variant={'smBold'} color={theme.palette.gray600.main}>
        {showAnswer
          ? TextUtils.getAnswerText(requirementAnswer, spec)
          : TextUtils.getConfigText(requirementAnswer, spec)}
      </Typography>
    </Box>
  );
}
