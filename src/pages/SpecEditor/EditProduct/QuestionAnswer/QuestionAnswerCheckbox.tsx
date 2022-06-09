import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import RadioCtrl from '../../../../FormProvider/RadioCtrl';
import { FlexColumnBox } from '../../../../components/FlexBox/FlexColumnBox';

const QuestionAnswerCheckbox = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <FlexColumnBox>
      <Typography variant={'smBold'}>{t('Answer')}</Typography>
      <RadioCtrl
        name={'question.answer.value'}
        options={[
          { value: 'true', label: t('Yes') },
          { value: 'false', label: t('No') }
        ]}
      />
    </FlexColumnBox>
  );
};

export default QuestionAnswerCheckbox;
