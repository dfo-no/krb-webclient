import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext, useWatch } from 'react-hook-form';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { Box, Typography } from '@mui/material';
import { DFOCheckbox } from '../../../components/DFOCheckbox/DFOCheckbox';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';

const QuestionSpecificationCheckbox = () => {
  const [preferredScore, setPreferredScore] = useState(false);
  const { control } = useFormContext<IRequirementAnswer>();
  const usePointsNonPrefered = useWatch({
    name: 'question.config.pointsNonPrefered',
    control
  });

  useEffect(() => {
    if (usePointsNonPrefered > 0) {
      setPreferredScore(true);
    }
  }, [usePointsNonPrefered]);

  const { t } = useTranslation();

  return (
    <Box>
      <Box>
        <DFOCheckbox
          value={preferredScore}
          onClick={() => setPreferredScore((prev) => !prev)}
        />
        <Typography variant={'smBold'} sx={{ marginBottom: 2 }}>
          {t('Give score for non-preferred alternative')}
        </Typography>
      </Box>
      {preferredScore && (
        <VerticalTextCtrl
          name={'question.config.pointsNonPrefered'}
          label={t('Score for non-preferred')}
          placeholder={''}
          type={'number'}
        />
      )}
    </Box>
  );
};

export default QuestionSpecificationCheckbox;
