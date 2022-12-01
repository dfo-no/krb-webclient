import React, { ReactElement, useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { t } from 'i18next';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import classnames from 'classnames';
import DeleteIcon from '@mui/icons-material/Delete';

import ArrayUniqueErrorMessage from '../../../../Form/ArrayUniqueErrorMessage';
import css from '../QuestionContent.module.scss';
import DateCtrl from '../../../../FormProvider/DateCtrl';
import DateUtils from '../../../../common/DateUtils';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import theme from '../../../../theme';
import UuidService from '../../../../Nexus/services/UuidService';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import { IPeriodDateQuestion } from '../../../../Nexus/entities/IPeriodDateQuestion';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import { DFOCheckbox } from '../../../../components/DFOCheckbox/DFOCheckbox';

interface IProps {
  item: IPeriodDateQuestion;
}

const QuestionSpecificationPeriodDate = ({ item }: IProps): ReactElement => {
  const { control, formState, setValue } = useFormContext<IRequirementAnswer>();
  const [awardCriteria, setAwardCriteria] = useState(false);

  const useFromBoundary = useWatch({
    name: 'question.config.fromBoundary',
    control,
  });
  const useToBoundary = useWatch({
    name: 'question.config.toBoundary',
    control,
  });

  const useMinScore = useWatch({
    name: 'question.config.dateScores.0',
    control,
  });
  const useMaxScore = useWatch({
    name: 'question.config.dateScores.1',
    control,
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'question.config.dateScores',
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
    if (!fields.length) {
      append({ id: new UuidService().generateId(), date: null, score: 0 });
      append({ id: new UuidService().generateId(), date: null, score: 100 });
    }
  }, [fields, append]);

  useEffect(() => {
    if (
      useMinScore &&
      (!DateUtils.sameTime(useFromBoundary, useMinScore.date) ||
        !useMinScore.id)
    ) {
      update(0, {
        id: useMinScore.id ?? new UuidService().generateId(),
        date: useFromBoundary,
        score: useMinScore.score,
      });
    }
  }, [useFromBoundary, useMinScore, update, append]);

  useEffect(() => {
    if (
      useMaxScore &&
      (!DateUtils.sameTime(useToBoundary, useMaxScore.date) || !useMaxScore.id)
    ) {
      update(1, {
        id: useMaxScore.id ?? new UuidService().generateId(),
        date: useToBoundary,
        score: useMaxScore.score,
      });
    }
  }, [useToBoundary, useMaxScore, update, append]);

  const onCheckboxClick = (): void => {
    setAwardCriteria((prev) => !prev);
  };

  return (
    <>
      <div className={css.QuestionDateAndTimePeriod}>
        <div className={css.QuestionDateAndTimePeriod__datetimeContainer}>
          <DateCtrl
            label={t('From')}
            name={'question.config.fromBoundary'}
            color={'var(--text-primary-color)'}
          />
          <DateCtrl
            label={t('To')}
            name={'question.config.toBoundary'}
            color={'var(--text-primary-color)'}
          />
        </div>
        <div onClick={onCheckboxClick}>
          <DFOCheckbox
            checked={awardCriteria}
            _color={'var(--text-primary-color)'}
          />
          <Typography className={css.CheckboxLabel} variant={'smBold'}>
            {t('Is the requirement an award criteria')}
          </Typography>
        </div>
      </div>
      {awardCriteria && (
        <div className={css.QuestionGrid}>
          <Typography
            className={classnames(css.FullRow, css.TopMargin)}
            variant={'smBold'}
          >
            {t('Evaluation')}
          </Typography>
          {fields.map((dateScore, idx) => {
            return (
              <div
                key={dateScore.id}
                className={classnames(css.QuestionGrid, css.FullRow)}
              >
                {idx < 2 ? (
                  <Typography variant={'smBold'} className={css.CenteredText}>
                    {DateUtils.prettyFormatDate(dateScore.date)}
                  </Typography>
                ) : (
                  <DateCtrl name={`question.config.dateScores[${idx}].date`} />
                )}
                <div className={css.Arrow}>
                  <ArrowForwardIcon />
                </div>
                <HorizontalTextCtrl
                  name={`question.config.dateScores[${idx}].score`}
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
            onClick={() =>
              append({
                id: new UuidService().generateId(),
                date: useFromBoundary,
                score: 0,
              })
            }
          >
            {t('Add new date score')}
          </Button>
        </div>
      )}
    </>
  );
};

export default QuestionSpecificationPeriodDate;
