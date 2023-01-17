import React, { ReactElement, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormContext, useWatch } from 'react-hook-form';

import css from '../QuestionContent.module.scss';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import YesNoSelection from '../../../../components/YesNoSelection/YesNoSelection';
import { DFOCheckbox } from '../../../../components/DFOCheckbox/DFOCheckbox';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';

const QuestionSpecificationCheckbox = (): ReactElement => {
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
      <YesNoSelection
        name={'question.config.preferedAlternative'}
        label={t('Preferred alternative')}
        color={'var(--text-primary-color)'}
      />
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

export default QuestionSpecificationCheckbox;
