import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { ReactElement, useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import css from './QuestionSpecification.module.scss';
import DateCtrl from '../../../../FormProvider/DateCtrl';
import DateUtils from '../../../../common/DateUtils';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import theme from '../../../../theme';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';

const QuestionSpecificationPeriodDate = (): ReactElement => {
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
    name: 'question.config.dateScores.0',
    control
  });
  const useMaxScore = useWatch({
    name: 'question.config.dateScores.1',
    control
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'question.config.dateScores'
  });

  useEffect(() => {
    if (!useMinScore) {
      append({ date: null, score: 0 });
      return;
    }
    if (!DateUtils.sameTime(useFromBoundary, useMinScore.date)) {
      update(0, { date: useFromBoundary, score: useMinScore.score });
    }
  }, [useFromBoundary, useMinScore, update, append]);

  useEffect(() => {
    if (!useMaxScore) {
      append({ date: null, score: 100 });
      return;
    }
    if (!DateUtils.sameTime(useToBoundary, useMaxScore.date)) {
      update(1, { date: useToBoundary, score: useMaxScore.score });
    }
  }, [useToBoundary, useMaxScore, update, append]);

  /* TODO: Enable view for period selection
  const [isPeriod, setIsPeriod] = useState(false);
  const useIsPeriod = useWatch({
    name: 'question.config.isPeriod',
    control
  });

  useEffect(() => {
    setIsPeriod(useIsPeriod);
  }, [useIsPeriod]);

  const periodGrid = (): ReactElement => {
    return (
      <Grid>
        <Grid item xs={20}>
          <CheckboxCtrl
            name={'question.config.isPeriod'}
            label={t<string>('Include to date')}
          />
        </Grid>
        <Grid item xs={20}>
          <Typography variant="smBold">{t('Period')}</Typography>
        </Grid>
        <Grid item xs={8}>
          <HorizontalTextCtrl
            placeholder={t('Minimum')}
            name={'question.config.periodMin'}
            type={'number'}
          />
        </Grid>
        <Grid item xs={1} className={css.arrow}>
          <ArrowForwardIcon />
        </Grid>
        <Grid item xs={8}>
          <HorizontalTextCtrl
            placeholder={t('Maximum')}
            name={'question.config.periodMax'}
            type={'number'}
          />
        </Grid>
      </Grid>
    );
  };
  */

  return (
    <Grid container columns={20} className={css.QuestionSpecificationGrid}>
      <Grid item xs={20}>
        <Typography variant={'smBold'}>{t('From/to date')}</Typography>
      </Grid>
      <Grid item xs={8}>
        <DateCtrl name={'question.config.fromBoundary'} />
      </Grid>
      <Grid item xs={1} className={css.centeredText}>
        /
      </Grid>
      <Grid item xs={8}>
        <DateCtrl name={'question.config.toBoundary'} />
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
                  {DateUtils.prettyFormatDate(scoreValue.date)}
                </Typography>
              ) : (
                <DateCtrl
                  name={
                    `question.config.dateScores.${idx}.date` as 'question.config.dateScores.0.date'
                  }
                />
              )}
            </Grid>
            <Grid item xs={1} className={css.arrow}>
              <ArrowForwardIcon />
            </Grid>
            <Grid item xs={8}>
              <HorizontalTextCtrl
                name={
                  `question.config.dateScores.${idx}.score` as 'question.config.dateScores.0.score'
                }
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
          onClick={() => append({ date: useFromBoundary, score: 0 })}
        >
          {t('Add new date score')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default QuestionSpecificationPeriodDate;
