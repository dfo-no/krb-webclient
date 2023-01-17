import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from './PrefilledResponse.module.scss';
import TextUtils from '../../../common/TextUtils';
import theme from '../../../theme';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { PrefilledResponseContainer } from '../PrefilledResponseContext';

interface Props {
  requirementAnswer?: IRequirementAnswer;
}

export default function ChosenAnswer({
  requirementAnswer,
}: Props): React.ReactElement {
  const { t } = useTranslation();
  const { prefilledResponse } = PrefilledResponseContainer.useContainer();

  if (!requirementAnswer) {
    return (
      <div className={css.Answer}>
        <Typography variant={'sm'} color={theme.palette.gray600.main}>
          {t('Not answered')}
        </Typography>
      </div>
    );
  }

  return (
    <div className={css.Answer}>
      <Typography variant={'sm'} color={theme.palette.gray600.main}>
        {`${t('Answer')}: `}
      </Typography>
      <Typography variant={'smBold'} color={theme.palette.gray600.main}>
        {TextUtils.getAnswerText(requirementAnswer, prefilledResponse.bank)}
      </Typography>
    </div>
  );
}
