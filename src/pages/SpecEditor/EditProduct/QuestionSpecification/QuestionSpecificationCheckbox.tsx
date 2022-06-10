import React, { ReactElement, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormContext, useWatch } from 'react-hook-form';

import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import YesNoSelection from '../../../../components/YesNoSelection/YesNoSelection';
import { DFOCheckbox } from '../../../../components/DFOCheckbox/DFOCheckbox';
import { FlexColumnBox } from '../../../../components/FlexBox/FlexColumnBox';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';

const QuestionSpecificationCheckbox = (): ReactElement => {
  const { t } = useTranslation();
  const [preferredScore, setPreferredScore] = useState(false);
  const { control, setValue } = useFormContext<IRequirementAnswer>();
  const usePointsNonPrefered = useWatch({
    name: 'question.config.pointsNonPrefered',
    control
  });

  useEffect(() => {
    if (usePointsNonPrefered > 0) {
      setPreferredScore(true);
    }
  }, [usePointsNonPrefered]);

  const onCheckboxClick = (): void => {
    if (preferredScore) {
      setValue('question.config.pointsNonPrefered', 0);
    }
    setPreferredScore((prev) => !prev);
  };

  return (
    <FlexColumnBox>
      <Typography variant={'smBold'}>{t('Preferred alternative')}</Typography>
      <YesNoSelection name={'question.config.preferedAlternative'} />
      <Box onClick={onCheckboxClick} sx={{ paddingTop: 1 }}>
        <DFOCheckbox checked={preferredScore} />
        <Typography variant={'smBold'} sx={{ marginLeft: 1 }}>
          {t('Give score for non-preferred alternative')}
        </Typography>
      </Box>
      {preferredScore && (
        <Box sx={{ paddingLeft: 3, paddingTop: 1 }}>
          <VerticalTextCtrl
            name={'question.config.pointsNonPrefered'}
            label={t('Score for non-preferred')}
            placeholder={''}
            type={'number'}
          />
        </Box>
      )}
    </FlexColumnBox>
  );
};

export default QuestionSpecificationCheckbox;
