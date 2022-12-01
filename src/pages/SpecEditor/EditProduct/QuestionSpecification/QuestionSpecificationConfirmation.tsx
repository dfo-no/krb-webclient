import React, { ReactElement, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

import css from '../QuestionContent.module.scss';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import { DFOCheckbox } from '../../../../components/DFOCheckbox/DFOCheckbox';

const QuestionSpecificationConfirmation = (): ReactElement => {
  const { t } = useTranslation();
  const [awardCriteria, setAwardCriteria] = useState(false);
  const { control, setValue } = useFormContext<IRequirementAnswer>();
  const useDiscountNonPrefered = useWatch({
    name: 'question.config.discountUnconfirmed',
    control,
  });

  useEffect(() => {
    if (useDiscountNonPrefered > 0) {
      setAwardCriteria(true);
    }
  }, [useDiscountNonPrefered]);

  const onCheckboxClick = (): void => {
    if (awardCriteria) {
      setValue('question.config.discountUnconfirmed', 0);
    } else {
      setValue('question.config.discountUnconfirmed', 70);
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
          name={'question.config.discountUnconfirmed'}
          label={t('Score for unconfirmed')}
          placeholder={''}
          type={'number'}
        />
      )}
    </div>
  );
};

export default QuestionSpecificationConfirmation;
