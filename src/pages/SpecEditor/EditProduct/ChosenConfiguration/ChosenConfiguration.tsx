import React from 'react';
import { Box, Typography } from '@mui/material';
import { t } from 'i18next';

import TextUtils from '../../../../common/TextUtils';
import theme from '../../../../theme';
import { IRequirement } from '../../../../Nexus/entities/IRequirement';
import { VariantType } from '../../../../Nexus/enums';
import { useProductIndexState } from '../../../../components/ProductIndexContext/ProductIndexContext';
import { useSpecificationState } from '../../SpecificationContext';

interface IProps {
  requirement: IRequirement;
}

export default function ChosenConfiguration({
  requirement
}: IProps): React.ReactElement {
  const { specification } = useSpecificationState();
  const { productIndex } = useProductIndexState();

  const requirementAnswer = (
    productIndex === -1 ? specification : specification.products[productIndex]
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
          ? TextUtils.getAnswerText(requirementAnswer, specification.bank)
          : TextUtils.getConfigText(requirementAnswer, specification.bank)}
      </Typography>
    </Box>
  );
}
