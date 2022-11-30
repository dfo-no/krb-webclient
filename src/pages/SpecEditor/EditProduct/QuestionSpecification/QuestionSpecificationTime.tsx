import React, { ReactElement, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { t } from 'i18next';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Button, Location, Variant } from '@dfo-no/components.button';
import { Symbols } from '@dfo-no/components.icon';
import ClearIcon from '@mui/icons-material/Clear';

import ArrayUniqueErrorMessage from '../../../../Form/ArrayUniqueErrorMessage';
import css from '../QuestionContent.module.scss';
import DateUtils from '../../../../common/DateUtils';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import TimeCtrl from '../../../../FormProvider/TimeCtrl';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import { ITimeQuestion } from '../../../../Nexus/entities/ITimeQuestion';
import UuidService from '../../../../Nexus/services/UuidService';
import { DFOCheckbox } from '../../../../components/DFOCheckbox/DFOCheckbox';
import ToolbarItem from '../../../../components/UI/Toolbar/ToolbarItem';

interface IProps {
  item: ITimeQuestion;
}

const QuestionSpecificationTime = ({ item }: IProps): ReactElement => {
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
    name: 'question.config.timeScores.0',
    control,
  });
  const useMaxScore = useWatch({
    name: 'question.config.timeScores.1',
    control,
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'question.config.timeScores',
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
    if (!fields.length && awardCriteria) {
      append({ id: new UuidService().generateId(), time: null, score: 0 });
      append({ id: new UuidService().generateId(), time: null, score: 100 });
    }
  }, [fields, awardCriteria, append]);

  useEffect(() => {
    if (
      awardCriteria &&
      useMinScore &&
      (!DateUtils.sameTime(useFromBoundary, useMinScore.time) ||
        !useMinScore.id)
    ) {
      update(0, {
        id: useMinScore.id ?? new UuidService().generateId(),
        time: useFromBoundary,
        score: useMinScore.score,
      });
    }
  }, [awardCriteria, useFromBoundary, useMinScore, update]);

  useEffect(() => {
    if (
      awardCriteria &&
      useMaxScore &&
      useToBoundary &&
      (!DateUtils.sameTime(useToBoundary, useMaxScore.time) || !useMaxScore.id)
    ) {
      update(1, {
        id: useMaxScore.id ?? new UuidService().generateId(),
        time: useToBoundary,
        score: useMaxScore.score,
      });
    }
  }, [awardCriteria, useToBoundary, useMaxScore, update, append]);

  useEffect(() => {
    if (fields.length > 0) {
      setAwardCriteria(true);
    }
  }, [fields]);

  const onCheckboxClick = (): void => {
    setAwardCriteria((prev) => !prev);
  };

  const fromTimeLabel = `${
    item.config.isPeriod
      ? t('From')
      : t('Enter the first and last possible time')
  }`;

  const toTimeLabel = t('To');

  return (
    <>
      <div className={css.QuestionDateAndTimePeriod}>
        {!item.config.isPeriod && (
          <Typography className={css.FullRow} variant={'smBold'}>
            {fromTimeLabel}
          </Typography>
        )}
        <div className={css.QuestionDateAndTimePeriod__datetimeContainer}>
          <TimeCtrl
            label={`${item.config.isPeriod ? fromTimeLabel : ''}`}
            name={'question.config.fromBoundary'}
            color={'var(--text-primary-color)'}
          />
          <TimeCtrl
            label={`${item.config.isPeriod ? toTimeLabel : ''}`}
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
        <div className={css.QuestionCriteria}>
          <div className={css.QuestionCriteria__wrapper}>
            <div className={css.QuestionCriteria__wrapper__CtrlContainer}>
              {fields.map((timeScore, index) => {
                return (
                  <div
                    key={timeScore.id}
                    className={css.QuestionCriteria__Ctrl}
                  >
                    <TimeCtrl
                      className={css.QuestionCriteria__Ctrl__inputCtrl}
                      label={index == 0 ? `${t('Date')}` : ''}
                      name={`question.config.timeScores[${index}].time`}
                      color={'var(--text-primary-color)'}
                    />
                    <HorizontalTextCtrl
                      className={css.QuestionCriteria__Ctrl__inputCtrl}
                      label={index == 0 ? t('Deduction') : ''}
                      name={`question.config.timeScores[${index}].score`}
                      placeholder={t('Value')}
                      type={'number'}
                      adornment={t('NOK')}
                      color={'var(--text-primary-color)'}
                    />
                    {index == 0 && (
                      <Button
                        className={css.QuestionCriteria__Ctrl__action}
                        icon={Symbols.Plus}
                        iconLocation={Location.Before}
                        variant={Variant.Ghost}
                        onClick={() =>
                          append({
                            id: new UuidService().generateId(),
                            time: useFromBoundary,
                            score: 0,
                          })
                        }
                      >
                        {t('Add row')}
                      </Button>
                    )}
                    {index > 0 && (
                      <ToolbarItem
                        secondaryText={t('Remove')}
                        icon={<ClearIcon />}
                        handleClick={() => remove(index)}
                        fontSize={'small'}
                      />
                    )}
                  </div>
                );
              })}
              <div>
                <ArrayUniqueErrorMessage
                  errors={formState.errors}
                  path={'question.config.timeScores'}
                  length={fields.length}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionSpecificationTime;
