import React from 'react';
import { Box, Typography } from '@mui/material';
import { t } from 'i18next';

import TextUtils from '../../../common/TextUtils';
import theme from '../../../theme';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { useAppSelector } from '../../../store/hooks';

interface IProps {
  requirementAnswer: IRequirementAnswer;
  existingAnswer?: IRequirementAnswer;
}

export default function ChosenAnswer({
  requirementAnswer,
  existingAnswer
}: IProps): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);

  return (
    <Box>
      <Typography variant={'sm'} color={theme.palette.gray600.main}>
        {existingAnswer ? `${t('Chosen')}: ` : `${t('Answer')}: `}
      </Typography>
      <Typography variant={'smBold'} color={theme.palette.gray600.main}>
        {TextUtils.getAnswerText(
          existingAnswer ? existingAnswer : requirementAnswer,
          response.specification
        )}
      </Typography>
    </Box>
  );
}
