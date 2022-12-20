import React, { ReactElement, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { t } from 'i18next';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Button, Location, Variant } from '@dfo-no/components.button';
import { Symbols } from '@dfo-no/components.icon';

import ArrayUniqueErrorMessage from '../../../../Form/ArrayUniqueErrorMessage';
import css from '../QuestionContent.module.scss';
import DateCtrl from '../../../../FormProvider/DateCtrl';
import DateUtils from '../../../../common/DateUtils';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import UuidService from '../../../../Nexus/services/UuidService';
import { IPeriodDateQuestion } from '../../../../Nexus/entities/IPeriodDateQuestion';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import { DFOCheckbox } from '../../../../components/DFOCheckbox/DFOCheckbox';
import ToolbarItem from '../../../../components/UI/Toolbar/ToolbarItem';
import { WeekdaysCheckboxList } from '../../../../components/WeekdaysCheckboxList/WeekdaysCheckboxList';
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
    if (!fields.length && awardCriteria) {
      append({ id: new UuidService().generateId(), date: null, score: 0 });
      append({ id: new UuidService().generateId(), date: null, score: 100 });
    }
  }, [fields, awardCriteria, append]);

  useEffect(() => {
    if (
      awardCriteria &&
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
  }, [awardCriteria, useFromBoundary, useMinScore, update, append]);

  useEffect(() => {
    if (
      awardCriteria &&
      useMaxScore &&
      (!DateUtils.sameTime(useToBoundary, useMaxScore.date) || !useMaxScore.id)
    ) {
      update(1, {
        id: useMaxScore.id ?? new UuidService().generateId(),
        date: useToBoundary,
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
    if (fields.length) {
      remove();
    }
  };

  return (
    <div>
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
        {item.config.isPeriod && (
          <>
            <HorizontalTextCtrl
              className={css.QuestionCriteria__Ctrl__inputCtrl}
              label={t('Duration')}
              name={`question.config.duration`}
              defaultValue={0}
              placeholder={t('Value')}
              type={'number'}
              adornment={t('Days')}
              color={'var(--text-primary-color)'}
            />
            <WeekdaysCheckboxList
              item={item}
              control={control}
              setValue={setValue}
            />
          </>
        )}
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
          <div className={css.QuestionCriteria}>
            <div className={css.QuestionCriteria__wrapper}>
              <div className={css.QuestionCriteria__wrapper__CtrlContainer}>
                {fields.map((dateScore, index) => {
                  return (
                    <div
                      key={dateScore.id}
                      className={css.QuestionCriteria__Ctrl}
                    >
                      <DateCtrl
                        className={css.QuestionCriteria__Ctrl__inputCtrl}
                        label={index == 0 ? `${t('Date')}` : ''}
                        name={`question.config.dateScores[${index}].date`}
                        color={'var(--text-primary-color)'}
                      />
                      <HorizontalTextCtrl
                        className={css.QuestionCriteria__Ctrl__inputCtrl}
                        label={index == 0 ? t('Discount') : ''}
                        name={`question.config.dateScores[${index}].score`}
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
                              date: useFromBoundary,
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
                    path={'question.config.dateScores'}
                    length={fields.length}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionSpecificationPeriodDate;
