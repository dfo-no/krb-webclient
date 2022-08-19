import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import classnames from 'classnames';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { ReactElement, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { t } from 'i18next';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import ArrayUniqueErrorMessage from '../../../../Form/ArrayUniqueErrorMessage';
import css from '../QuestionContent.module.scss';
import DateCtrl from '../../../../FormProvider/DateCtrl';
import DateUtils from '../../../../common/DateUtils';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import theme from '../../../../theme';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { IPeriodDateQuestion } from '../../../../Nexus/entities/IPeriodDateQuestion';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';

interface IProps {
  item: IPeriodDateQuestion;
}

const QuestionSpecificationPeriodDate = ({ item }: IProps): ReactElement => {
  const { control, formState, setValue } = useFormContext<IRequirementAnswer>();

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
    if (useFromBoundary) {
      setValue('question.answer.fromDate', useFromBoundary);
      if (item.config.isPeriod) {
        setValue('question.answer.toDate', useFromBoundary);
      }
    }
  }, [useFromBoundary, setValue, item.config.isPeriod]);

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

  return (
    <div className={css.QuestionGrid}>
      <Typography className={css.FullRow} variant={'smBold'}>
        {t('From/to date')}
      </Typography>
      <DateCtrl name={'question.config.fromBoundary'} />
      <Typography className={css.CenteredText} variant={'lgBold'}>
        -
      </Typography>
      <DateCtrl name={'question.config.toBoundary'} />
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
              <Typography variant={'smBold'} className={css.CenteredText}>
                {DateUtils.prettyFormatDate(scoreValue.date)}
              </Typography>
            ) : (
              <DateCtrl name={`question.config.dateScores.${idx}.date`} />
            )}
            <div className={css.Arrow}>
              <ArrowForwardIcon />
            </div>
            <HorizontalTextCtrl
              name={`question.config.dateScores.${idx}.score`}
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
          path={'question.config.dateScores'}
          length={fields.length}
        />
      </div>
      <Button
        variant="primary"
        onClick={() => append({ date: useFromBoundary, score: 0 })}
      >
        {t('Add new date score')}
      </Button>
    </div>
  );
};

export default QuestionSpecificationPeriodDate;
