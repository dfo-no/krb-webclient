import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import classnames from 'classnames';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography } from '@mui/material';
import React, { ReactElement, useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ArrayUniqueErrorMessage from '../../../../Form/ArrayUniqueErrorMessage';
import css from '../QuestionContent.module.scss';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import theme from '../../../../theme';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';
import { ISliderQuestion } from '../../../../Nexus/entities/ISliderQuestion';

interface IProps {
  item: ISliderQuestion;
}

const QuestionSpecificationSlider = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();
  const { control, setValue, formState } = useFormContext<IRequirementAnswer>();

  const useMinValue = useWatch({ name: 'question.config.min', control });
  const useMaxValue = useWatch({ name: 'question.config.max', control });

  const useMinScore = useWatch({
    name: 'question.config.scoreValues.0',
    control
  });
  const useMaxScore = useWatch({
    name: 'question.config.scoreValues.1',
    control
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'question.config.scoreValues'
  });

  useEffect(() => {
    if (useMinValue !== useMinScore.value) {
      update(0, { value: useMinValue, score: useMinScore.score });
      setValue('question.answer.value', useMinValue);
    }
  }, [useMinValue, useMinScore, update, setValue]);

  useEffect(() => {
    if (useMaxValue !== useMaxScore.value) {
      update(1, { value: useMaxValue, score: useMaxScore.score });
    }
  }, [useMaxValue, useMaxScore, update]);

  return (
    <div className={css.QuestionGrid}>
      <HorizontalTextCtrl
        name={'question.config.min'}
        placeholder={t('Minimum')}
        type={'number'}
      />
      <div className={css.Arrow}>
        <ArrowForwardIcon />
      </div>
      <HorizontalTextCtrl
        name={'question.config.max'}
        placeholder={t('Maximum')}
        type={'number'}
      />
      <Typography variant={'md'} className={css.Unit}>
        {item.config.unit}
      </Typography>
      <Typography className={css.CenteredText} variant={'sm'}>
        {t('Minimum')}: {item.config.min}
      </Typography>
      <Typography className={css.CenteredText} variant={'sm'}>
        {item.config.step}
      </Typography>
      <Typography className={css.CenteredText} variant={'sm'}>
        {t('Maximum')}: {item.config.max}
      </Typography>
      <Typography
        className={classnames(css.FullRow, css.TopMargin)}
        variant={'smBold'}
      >
        {t('Evaluation')}
      </Typography>
      {fields.map((scoreValue, idx) => {
        return (
          <div key={idx} className={classnames(css.QuestionGrid, css.FullRow)}>
            {idx < 2 ? (
              <Typography variant={'smBold'}>{scoreValue.value}</Typography>
            ) : (
              <HorizontalTextCtrl
                name={`question.config.scoreValues.${idx}.value`}
                placeholder={t('Value')}
                type={'number'}
              />
            )}
            <div className={css.Arrow}>
              <ArrowForwardIcon />
            </div>
            <HorizontalTextCtrl
              name={`question.config.scoreValues.${idx}.score`}
              placeholder={t('Score')}
              type={'number'}
            />
            {idx > 1 && (
              <div className={css.Delete}>
                <FormIconButton
                  hoverColor={theme.palette.errorRed.main}
                  onClick={() => remove(idx)}
                >
                  <DeleteIcon />
                </FormIconButton>
              </div>
            )}
          </div>
        );
      })}
      <div className={css.FullRow}>
        <ArrayUniqueErrorMessage
          errors={formState.errors}
          path={'question.config.scoreValues'}
          length={fields.length}
        />
      </div>
      <Button
        variant="primary"
        onClick={() => append({ value: useMinValue, score: 0 })}
      >
        {t('Add new value score')}
      </Button>
    </div>
  );
};

export default QuestionSpecificationSlider;
