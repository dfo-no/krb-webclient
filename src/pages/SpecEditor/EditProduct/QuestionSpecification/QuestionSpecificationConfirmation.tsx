import React, { ReactElement, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

import css from '../QuestionContent.module.scss';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import { DFOCheckbox } from '../../../../components/DFOCheckbox/DFOCheckbox';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';

const QuestionSpecificationConfirmation = (): ReactElement => {
  const { t } = useTranslation();
  const [awardCriteria, setAwardCriteria] = useState(false);
  const { control, setValue } = useFormContext<IRequirementAnswer>();
  const usePointsNonPrefered = useWatch({
    name: 'question.config.pointsUnconfirmed',
    control,
  });

  useEffect(() => {
    if (usePointsNonPrefered > 0) {
      setAwardCriteria(true);
    }
  }, [usePointsNonPrefered]);

  const onCheckboxClick = (): void => {
    if (awardCriteria) {
      setValue('question.config.pointsUnconfirmed', 0);
    } else {
      setValue('question.config.pointsUnconfirmed', 70);
    }
    setAwardCriteria((prev) => !prev);
  };

  return (
    <div className={css.QuestionFlex}>
      <div onClick={onCheckboxClick}>
        <DFOCheckbox
          checked={awardCriteria}
          _color={'var(--text-primary-color)'}
        />
        <Typography className={css.CheckboxLabel} variant={'mdBold'}>
          {t('Is the requirement an award criteria')}
        </Typography>
      </div>
      {awardCriteria && (
        <VerticalTextCtrl
          className={css.QuestionFlex__textCtrl}
          name={'question.config.pointsUnconfirmed'}
          label={t('discount')}
          placeholder={''}
          type={'number'}
          color={'var(--text-primary-color)'}
          adornment={t('NOK')}
        />
      )}
    </div>
  );
};

export default QuestionSpecificationConfirmation;
