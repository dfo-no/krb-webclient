import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext, useWatch } from 'react-hook-form';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { Box, Typography } from '@mui/material';
import { DFOCheckbox } from '../../../components/DFOCheckbox/DFOCheckbox';
import VerticalTextCtrl from '../../../FormProvider/VerticalTextCtrl';
import RadioCtrl from '../../../FormProvider/RadioCtrl';

const QuestionSpecificationCheckbox = () => {
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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant={'smBold'}>{t('Preferred alternative')}</Typography>
      <RadioCtrl
        name={'question.config.preferedAlternative'}
        options={[
          { value: 'true', label: t('Yes') },
          { value: 'false', label: t('No') }
        ]}
      />
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
    </Box>
  );
};

export default QuestionSpecificationCheckbox;
