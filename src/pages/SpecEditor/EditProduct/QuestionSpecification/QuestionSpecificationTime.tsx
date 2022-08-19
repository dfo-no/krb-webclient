import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import classnames from 'classnames';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { ReactElement, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { t } from 'i18next';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import ArrayUniqueErrorMessage from '../../../../Form/ArrayUniqueErrorMessage';
import css from '../QuestionContent.module.scss';
import DateUtils from '../../../../common/DateUtils';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import theme from '../../../../theme';
import TimeCtrl from '../../../../FormProvider/TimeCtrl';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';
import { ITimeQuestion } from '../../../../Nexus/entities/ITimeQuestion';

interface IProps {
  item: ITimeQuestion;
}

const QuestionSpecificationTime = ({ item }: IProps): ReactElement => {
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
    if (useFromBoundary) {
      setValue('question.answer.fromTime', useFromBoundary);
      if (item.config.isPeriod) {
        setValue('question.answer.toTime', useFromBoundary);
      }
    }
  }, [useFromBoundary, setValue, item.config.isPeriod]);

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
    <div className={css.QuestionGrid}>
      <Typography className={css.FullRow} variant={'smBold'}>
        {t('From/to date')}
      </Typography>
      <TimeCtrl name={'question.config.fromBoundary'} />
      <Typography className={css.CenteredText} variant={'lgBold'}>
        -
      </Typography>
      <TimeCtrl name={'question.config.toBoundary'} />
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
                {DateUtils.prettyFormatTime(scoreValue.time)}
              </Typography>
            ) : (
              <TimeCtrl name={`question.config.timeScores.${idx}.time`} />
            )}
            <div className={css.Arrow}>
              <ArrowForwardIcon />
            </div>
            <HorizontalTextCtrl
              name={`question.config.timeScores.${idx}.score`}
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
          path={'question.config.timeScores'}
          length={fields.length}
        />
      </div>
      <Button
        variant="primary"
        onClick={() => append({ time: useFromBoundary, score: 0 })}
      >
        {t('Add new time score')}
      </Button>
    </div>
  );
};

export default QuestionSpecificationTime;
