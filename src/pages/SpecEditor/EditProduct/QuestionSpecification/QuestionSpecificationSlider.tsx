import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, Typography } from '@mui/material';
import React, { ReactElement, useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from './QuestionSpecification.module.scss';
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
  const { control } = useFormContext<IRequirementAnswer>();

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
    }
  }, [useMinValue, useMinScore, update]);

  useEffect(() => {
    if (useMaxValue !== useMaxScore.value) {
      update(1, { value: useMaxValue, score: useMaxScore.score });
    }
  }, [useMaxValue, useMaxScore, update]);

  return (
    <Grid container columns={20} className={css.QuestionSpecificationGrid}>
      <Grid item xs={8}>
        <HorizontalTextCtrl
          name={'question.config.min'}
          placeholder={t('Minimum')}
          type={'number'}
        />
      </Grid>
      <Grid item xs={1} className={css.arrow}>
        <ArrowForwardIcon />
      </Grid>
      <Grid item xs={8}>
        <HorizontalTextCtrl
          name={'question.config.max'}
          placeholder={t('Maximum')}
          type={'number'}
        />
      </Grid>
      <Grid item xs={3} className={css.text}>
        <Typography variant={'md'} className={css.unit}>
          {item.config.unit}
        </Typography>
      </Grid>
      <Grid item xs={8} className={css.centeredText}>
        <Typography variant={'sm'}>
          {t('Minimum')}: {item.config.min}
        </Typography>
      </Grid>
      <Grid item xs={1} className={css.centeredText}>
        <Typography variant={'sm'}>{item.config.step}</Typography>
      </Grid>
      <Grid item xs={8} className={css.centeredText}>
        <Typography variant={'sm'}>
          {t('Maximum')}: {item.config.max}
        </Typography>
      </Grid>
      <Grid item xs={20}>
        <Typography variant={'smBold'}>{t('Evaluation')}</Typography>
      </Grid>
      {fields.map((scoreValue, idx) => {
        return (
          <Grid item container key={scoreValue.id} xs={20} columns={20}>
            <Grid item xs={8} className={css.centeredText}>
              {idx < 2 ? (
                <Typography variant={'smBold'}>{scoreValue.value}</Typography>
              ) : (
                <HorizontalTextCtrl
                  name={`question.config.scoreValues.${idx}.value`}
                  placeholder={t('Value')}
                  type={'number'}
                />
              )}
            </Grid>
            <Grid item xs={1} className={css.arrow}>
              <ArrowForwardIcon />
            </Grid>
            <Grid item xs={8}>
              <HorizontalTextCtrl
                name={`question.config.scoreValues.${idx}.score`}
                placeholder={t('Score')}
                type={'number'}
              />
            </Grid>
            {idx > 1 && (
              <Grid item xs={2} className={css.delete}>
                <FormIconButton
                  hoverColor={theme.palette.errorRed.main}
                  onClick={() => remove(idx)}
                >
                  <DeleteIcon />
                </FormIconButton>
              </Grid>
            )}
          </Grid>
        );
      })}
      <Grid item xs={20}>
        <Button
          variant="primary"
          onClick={() => append({ value: useMinValue, score: 0 })}
        >
          {t('Add new value score')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default QuestionSpecificationSlider;
