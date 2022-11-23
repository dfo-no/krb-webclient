import { Typography } from '@mui/material';
import React, { ReactElement, useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from '../QuestionContent.module.scss';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import UuidService from '../../../../Nexus/services/UuidService';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import { ISliderQuestion } from '../../../../Nexus/entities/ISliderQuestion';

interface IProps {
  item: ISliderQuestion;
}

const QuestionSpecificationSlider = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();
  const { control, setValue } = useFormContext<IRequirementAnswer>();

  const useMinValue = useWatch({ name: 'question.config.min', control });
  const useMaxValue = useWatch({ name: 'question.config.max', control });

  const useMinScore = useWatch({
    name: 'question.config.scoreValues.0',
    control,
  });
  const useMaxScore = useWatch({
    name: 'question.config.scoreValues.1',
    control,
  });

  const { fields, append, update } = useFieldArray({
    control,
    name: 'question.config.scoreValues',
  });

  useEffect(() => {
    if (!fields.length) {
      append({
        id: new UuidService().generateId(),
        value: 0,
        score: 0,
      });
      append({
        id: new UuidService().generateId(),
        value: 0,
        score: 100,
      });
    }
  }, [fields, append]);

  useEffect(() => {
    if (useMinScore && (useMinValue !== useMinScore.value || !useMinScore.id)) {
      update(0, {
        id: useMinScore.id ?? new UuidService().generateId(),
        value: useMinValue,
        score: useMinScore.score,
      });
      setValue('question.answer.value', useMinValue);
    }
  }, [useMinValue, useMinScore, update, setValue]);

  useEffect(() => {
    if (useMaxScore && (useMaxValue !== useMaxScore.value || !useMaxScore.id)) {
      update(1, {
        id: useMaxScore.id ?? new UuidService().generateId(),
        value: useMaxValue,
        score: useMaxScore.score,
      });
    }
  }, [useMaxValue, useMaxScore, update]);

  return (
    <div className={css.QuestionSlider}>
      <HorizontalTextCtrl
        className={css.QuestionSlider__textCtrl}
        name={'question.config.min'}
        label={t('From')}
        placeholder={t('Minimum')}
        type={'number'}
        adornment={item.config.unit}
      />
      <HorizontalTextCtrl
        className={css.QuestionSlider__textCtrl}
        name={'question.config.step'}
        label={t('Increment')}
        placeholder={t('Increment')}
        type={'number'}
      />
      <HorizontalTextCtrl
        className={css.QuestionSlider__textCtrl}
        name={'question.config.max'}
        label={t('To')}
        placeholder={t('Maximum')}
        type={'number'}
        adornment={item.config.unit}
      />
      <Typography variant={'sm'}>
        {t('Minimum')}: {item.config.min}
      </Typography>
      <br />
      <Typography variant={'sm'}>
        {t('Maximum')}: {item.config.max}
      </Typography>
    </div>
  );
};

export default QuestionSpecificationSlider;
