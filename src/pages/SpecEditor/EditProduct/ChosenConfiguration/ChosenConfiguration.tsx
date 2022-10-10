import React from 'react';
import { Typography } from '@mui/material';
import { t } from 'i18next';

import TextUtils from '../../../../common/TextUtils';
import theme from '../../../../theme';
import { ISpecificationProduct } from '../../../../Nexus/entities/ISpecificationProduct';
import { IRequirement } from '../../../../Nexus/entities/IRequirement';
import { VariantType } from '../../../../Nexus/enums';
import { useSpecificationState } from '../../SpecificationContext';

interface IProps {
  requirement: IRequirement;
  product?: ISpecificationProduct;
}

export default function ChosenConfiguration({
  requirement,
  product
}: IProps): React.ReactElement {
  const { specification } = useSpecificationState();

  const requirementAnswer = (product ?? specification).requirementAnswers.find(
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
    <>
      <Typography variant={'smBold'} color={theme.palette.gray600.main}>
        {showAnswer ? `${t('Answer')}: ` : `${t('Chosen')}: `}
      </Typography>
      <Typography variant={'smBold'} color={theme.palette.gray600.main}>
        {showAnswer
          ? TextUtils.getAnswerText(requirementAnswer, specification.bank)
          : TextUtils.getConfigText(requirementAnswer, specification.bank)}
      </Typography>
    </>
  );
}
