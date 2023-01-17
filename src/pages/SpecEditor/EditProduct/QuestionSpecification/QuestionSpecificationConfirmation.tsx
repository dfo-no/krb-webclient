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
  const useDiscount = useWatch({
    name: 'question.config.discount',
    control,
  });

  useEffect(() => {
    if (useDiscount > 0) {
      setAwardCriteria(true);
    }
  }, [useDiscount]);

  const onCheckboxClick = (): void => {
    if (awardCriteria) {
      setValue('question.config.discount', 0);
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
        <Typography className={css.CheckboxLabel} variant={'smBold'}>
          {t('Is the requirement an award criteria')}
        </Typography>
      </div>
      {awardCriteria && (
        <VerticalTextCtrl
          className={css.QuestionFlex__textCtrl}
          name={'question.config.discount'}
          label={t('Discount')}
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
