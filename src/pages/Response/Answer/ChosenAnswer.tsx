import React from 'react';
import { Box } from '@mui/material';
import { t } from 'i18next';

import TextUtils from '../../../common/TextUtils';
import { IRequirementAnswer } from '../../../Nexus/entities/IRequirementAnswer';
import { useResponseState } from '../ResponseContext';
import Toolbar from '../../../components/UI/Toolbar/ToolBar';
import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';
interface IProps {
  requirementAnswer: IRequirementAnswer;
  existingAnswer?: IRequirementAnswer;
}

export default function ChosenAnswer({
  requirementAnswer,
  existingAnswer,
}: IProps): React.ReactElement {
  const { response } = useResponseState();

  return (
    <Box>
      <Toolbar>
        <ToolbarItem
          primaryText={existingAnswer ? t('Chosen') : t('Answer')}
          secondaryText={TextUtils.getAnswerText(
            existingAnswer ? existingAnswer : requirementAnswer,
            response.specification.bank
          )}
          fontSize={'small'}
        />
      </Toolbar>
    </Box>
  );
}
