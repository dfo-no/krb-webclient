import React from 'react';
import { Box, Typography } from '@mui/material';
import { t } from 'i18next';

import TextUtils from '../../../../common/TextUtils';
import theme from '../../../../theme';
import VariantType from '../../../../Nexus/entities/VariantType';
import { IRequirement } from '../../../../Nexus/entities/IRequirement';
import { QuestionVariant } from '../../../../enums';
import { useAppSelector } from '../../../../store/hooks';
import { useSpecificationState } from '../../SpecificationContext';

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

  const getAnswerText = (): string => {
    switch (requirementAnswer.question.type) {
      case QuestionVariant.Q_CHECKBOX:
        return TextUtils.getCheckboxAnswer(requirementAnswer.question);
      case QuestionVariant.Q_SLIDER:
        return TextUtils.getSliderAnswer(requirementAnswer.question);
    }
    return '';
  };

  const getConfigText = (): string => {
    switch (requirementAnswer.question.type) {
      case QuestionVariant.Q_TEXT:
        return TextUtils.getTextConfig();
      case QuestionVariant.Q_CHECKBOX:
        return TextUtils.getCheckboxConfig(requirementAnswer.question);
      case QuestionVariant.Q_SLIDER:
        return TextUtils.getSliderConfig(requirementAnswer.question);
      case QuestionVariant.Q_CODELIST:
        return TextUtils.getCodelistConfig(requirementAnswer.question, spec);
      case QuestionVariant.Q_PERIOD_DATE:
        return TextUtils.getDateConfig(requirementAnswer.question);
      case QuestionVariant.Q_TIME:
        return TextUtils.getTimeConfig(requirementAnswer.question);
      case QuestionVariant.Q_FILEUPLOAD:
        return TextUtils.getFileUploadConfig(requirementAnswer.question);
    }
  };

  return (
    <Box>
      <Typography variant={'smBold'} color={theme.palette.primary.main}>
        {showAnswer ? `${t('Answer')}: ` : `${t('Chosen')}: `}
      </Typography>
      <Typography variant={'smBold'} color={theme.palette.primary.main}>
        {showAnswer ? getAnswerText() : getConfigText()}
      </Typography>
    </Box>
  );
}
