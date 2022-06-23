import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { ReactElement, useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import css from './QuestionSpecification.module.scss';
import DateUtils from '../../../../common/DateUtils';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import theme from '../../../../theme';
import TimeCtrl from '../../../../FormProvider/TimeCtrl';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';

const QuestionSpecificationTime = (): ReactElement => {
  const { control } = useFormContext<IRequirementAnswer>();

  const useFromBoundary = useWatch({
    name: 'question.config.fromBoundary',
    control
  });
  const useToBoundary = useWatch({
    name: 'question.config.toBoundary',
    control
  });

  const useMinScore = useWatch({
    name: 'question.config.timeScores.0',
    control
  });
  const useMaxScore = useWatch({
    name: 'question.config.timeScores.1',
    control
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'question.config.timeScores'
  });

  useEffect(() => {
    if (!useMinScore) {
      append({ time: null, score: 0 });
      return;
    }
    if (!DateUtils.sameTime(useFromBoundary, useMinScore.time)) {
      update(0, { time: useFromBoundary, score: useMinScore.score });
    }
  }, [useFromBoundary, useMinScore, update, append]);

  useEffect(() => {
    if (!useMaxScore) {
      append({ time: null, score: 100 });
      return;
    }
    if (useToBoundary && !DateUtils.sameTime(useToBoundary, useMaxScore.time)) {
      update(1, { time: useToBoundary, score: useMaxScore.score });
    }
  }, [useToBoundary, useMaxScore, update, append]);

  return (
    <Grid container columns={20} className={css.QuestionSpecificationGrid}>
      <Grid item xs={20}>
        <Typography variant={'smBold'}>{t('From/to time')}</Typography>
      </Grid>
      <Grid item xs={8}>
        <TimeCtrl name={'question.config.fromBoundary'} />
      </Grid>
      <Grid item xs={1} className={css.centeredText}>
        /
      </Grid>
      <Grid item xs={8}>
        <TimeCtrl name={'question.config.toBoundary'} />
      </Grid>
      <Grid item xs={20}>
        <Typography variant={'smBold'}>{t('Evaluation')}</Typography>
      </Grid>
      {fields.map((scoreValue, idx) => {
        return (
          <Grid item container key={scoreValue.id} xs={20} columns={20}>
            <Grid item xs={8}>
              {idx < 2 ? (
                <Typography variant={'smBold'} className={css.centeredText}>
                  {DateUtils.prettyFormatTime(scoreValue.time)}
                </Typography>
              ) : (
                <TimeCtrl name={`question.config.timeScores.${idx}.time`} />
              )}
            </Grid>
            <Grid item xs={1} className={css.arrow}>
              <ArrowForwardIcon />
            </Grid>
            <Grid item xs={8}>
              <HorizontalTextCtrl
                name={`question.config.timeScores.${idx}.score`}
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
          onClick={() => append({ time: useFromBoundary, score: 0 })}
        >
          {t('Add new time score')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default QuestionSpecificationTime;
