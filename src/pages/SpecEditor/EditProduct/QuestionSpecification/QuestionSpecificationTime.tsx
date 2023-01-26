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
  const [timePeriod, setTimePeriod] = useState(false);

  const useFromBoundary = useWatch({
    name: 'question.config.fromBoundary',
    control,
  });
  const useToBoundary = useWatch({
    name: 'question.config.toBoundary',
    control,
  });

  const useMinDiscount = useWatch({
    name: 'question.config.timeDiscounts.0',
    control,
  });
  const useMaxDiscount = useWatch({
    name: 'question.config.timeDiscounts.1',
    control,
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'question.config.timeDiscounts',
  });

  const useTimePeriodMin = useWatch({
    name: 'question.config.timePeriodMin',
    control,
  });
  const useTimePeriodMax = useWatch({
    name: 'question.config.timePeriodMax',
    control,
  });

  const useTimePeriodMinDiscount = useWatch({
    name: 'question.config.timePeriodDiscount.0',
    control,
  });
  const useTimePeriodMaxDiscount = useWatch({
    name: 'question.config.timePeriodDiscount.1',
    control,
  });

  const {
    fields: timePeriodDiscount,
    append: appendTimePeriodDiscount,
    remove: removeTimePeriodDiscount,
    update: updateTimePeriodDiscount,
  } = useFieldArray({
    control,
    name: 'question.config.timePeriodDiscount',
  });

  useEffect(() => {
    if (useFromBoundary || useToBoundary) {
      setValue('question.answer.fromTime', useFromBoundary);
      if (item.config.isPeriod) {
        setValue('question.answer.toTime', useToBoundary);
      }
    }
  }, [useFromBoundary, useToBoundary, setValue, item.config.isPeriod]);

  useEffect(() => {
    if (useTimePeriodMin) {
      setValue('question.answer.minTimePeriod', useTimePeriodMin);
      if (item.config.isPeriod) {
        setValue('question.answer.maxTimePeriod', useTimePeriodMin);
      }
    }
  }, [useTimePeriodMin, setValue, item.config.isPeriod]);

  useEffect(() => {
    if (!fields.length && awardCriteria) {
      append({ id: new UuidService().generateId(), time: null, discount: 0 });
      append({ id: new UuidService().generateId(), time: null, discount: 0 });
    }
  }, [fields, awardCriteria, append]);

  useEffect(() => {
    if (!timePeriodDiscount.length && timePeriod) {
      appendTimePeriodDiscount({
        id: new UuidService().generateId(),
        timePeriod: useTimePeriodMin,
        discount: 0,
      });
      appendTimePeriodDiscount({
        id: new UuidService().generateId(),
        timePeriod: useTimePeriodMax,
        discount: 0,
      });
    }
  }, [
    timePeriodDiscount.length,
    timePeriod,
    appendTimePeriodDiscount,
    setValue,
    useTimePeriodMin,
    useTimePeriodMax,
  ]);

  useEffect(() => {
    if (
      awardCriteria &&
      useMinDiscount &&
      (!DateUtils.sameTime(useFromBoundary, useMinDiscount.time) ||
        !useMinDiscount.id)
    ) {
      update(0, {
        id: useMinDiscount.id ?? new UuidService().generateId(),
        time: useFromBoundary,
        discount: useMinDiscount.discount,
      });
    }
  }, [awardCriteria, useFromBoundary, useMinDiscount, update]);

  useEffect(() => {
    if (
      awardCriteria &&
      useMaxDiscount &&
      useToBoundary &&
      (!DateUtils.sameTime(useToBoundary, useMaxDiscount.time) ||
        !useMaxDiscount.id)
    ) {
      update(1, {
        id: useMaxDiscount.id ?? new UuidService().generateId(),
        time: useToBoundary,
        discount: useMaxDiscount.discount,
      });
    }
  }, [awardCriteria, useToBoundary, useMaxDiscount, update, append]);

  useEffect(() => {
    if (
      timePeriod &&
      useTimePeriodMinDiscount &&
      !useTimePeriodMinDiscount.id
    ) {
      updateTimePeriodDiscount(0, {
        id: useTimePeriodMinDiscount.id ?? new UuidService().generateId(),
        timePeriod: useTimePeriodMin,
        discount: useTimePeriodMinDiscount.discount,
      });
    }
  }, [
    timePeriod,
    useTimePeriodMinDiscount,
    useTimePeriodMin,
    updateTimePeriodDiscount,
  ]);

  useEffect(() => {
    if (
      timePeriod &&
      useTimePeriodMaxDiscount &&
      !useTimePeriodMaxDiscount.id
    ) {
      updateTimePeriodDiscount(1, {
        id: useTimePeriodMaxDiscount.id ?? new UuidService().generateId(),
        timePeriod: useTimePeriodMax,
        discount: useTimePeriodMaxDiscount.discount,
      });
    }
  }, [
    timePeriod,
    useTimePeriodMaxDiscount,
    updateTimePeriodDiscount,
    useTimePeriodMax,
  ]);

  useEffect(() => {
    if (fields.length > 0) {
      setAwardCriteria(true);
    }
  }, [fields]);

  useEffect(() => {
    if (timePeriodDiscount.length > 0) {
      setTimePeriod(true);
    }
  }, [timePeriodDiscount]);

  const onCheckboxClick = (): void => {
    setAwardCriteria((prev) => !prev);
    if (fields.length) {
      remove();
    }
  };

  const handleTimePeriodDiscount = (): void => {
    setTimePeriod((prev) => !prev);
    if (timePeriodDiscount.length) {
      removeTimePeriodDiscount();
    }
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
        {item.config.isPeriod && (
          <div className={css.DurationContainer}>
            <span className={css.DurationContainer__title}>
              {timePeriod
                ? t('Enter the lowest and highest duration')
                : t('Preferred duration')}
            </span>
            <div className={css.QuestionDateAndTimePeriod__datetimeContainer}>
              {timePeriod && (
                <TimeCtrl
                  className={css.QuestionCriteria__Ctrl__inputCtrl}
                  name={`question.config.timePeriodMin`}
                  color={'var(--text-primary-color)'}
                />
              )}
              <TimeCtrl
                className={css.QuestionCriteria__Ctrl__inputCtrl}
                name={`question.config.timePeriodMax`}
                color={'var(--text-primary-color)'}
              />
            </div>
          </div>
        )}
        <div className={css.CheckboxContainer}>
          <div onClick={onCheckboxClick}>
            <DFOCheckbox
              checked={awardCriteria}
              _color={'var(--text-primary-color)'}
            />
            <Typography className={css.CheckboxLabel} variant={'smBold'}>
              {t('Is the requirement an award criteria')}
            </Typography>
          </div>
          {awardCriteria && item.config.isPeriod && (
            <div onClick={handleTimePeriodDiscount}>
              <DFOCheckbox
                checked={timePeriod}
                _color={'var(--text-primary-color)'}
              />
              <Typography className={css.CheckboxLabel} variant={'smBold'}>
                {t('Is there room for variation in duration')}
              </Typography>
            </div>
          )}
        </div>
      </div>
      {awardCriteria && (
        <div className={css.QuestionCriteria}>
          <div className={css.QuestionCriteria__wrapper}>
            <div className={css.QuestionCriteria__wrapper__CtrlContainer}>
              {fields.map((timeDiscount, index) => {
                return (
                  <div
                    key={timeDiscount.id}
                    className={css.QuestionCriteria__Ctrl}
                  >
                    <TimeCtrl
                      className={css.QuestionCriteria__Ctrl__inputCtrl}
                      label={index == 0 ? `${t('Time')}` : ''}
                      name={`question.config.timeDiscounts[${index}].time`}
                      color={'var(--text-primary-color)'}
                    />
                    <HorizontalTextCtrl
                      className={css.QuestionCriteria__Ctrl__inputCtrl}
                      label={index == 0 ? t('Discount') : ''}
                      name={`question.config.timeDiscounts[${index}].discount`}
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
                            discount: 0,
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
                  path={'question.config.timeDiscounts'}
                  length={fields.length}
                />
              </div>
            </div>
            {timePeriod && (
              <div className={css.QuestionCriteria__wrapper__CtrlContainer}>
                {timePeriodDiscount.map((periodTimeDiscount, index) => {
                  return (
                    <div
                      key={periodTimeDiscount.id}
                      className={css.QuestionCriteria__Ctrl}
                    >
                      <TimeCtrl
                        className={css.QuestionCriteria__Ctrl__inputCtrl}
                        label={index == 0 ? `${t('Time')}` : ''}
                        name={`question.config.timePeriodDiscount[${index}].timePeriod`}
                        color={'var(--text-primary-color)'}
                      />
                      <HorizontalTextCtrl
                        className={css.QuestionCriteria__Ctrl__inputCtrl}
                        label={index == 0 ? t('Discount') : ''}
                        name={`question.config.timePeriodDiscount[${index}].discount`}
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
                            appendTimePeriodDiscount({
                              id: new UuidService().generateId(),
                              timePeriod: null,
                              discount: 0,
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
                          handleClick={() => removeTimePeriodDiscount(index)}
                          fontSize={'small'}
                        />
                      )}
                    </div>
                  );
                })}
                <div>
                  <ArrayUniqueErrorMessage
                    errors={formState.errors}
                    path={'question.config.timePeriodDiscount'}
                    length={fields.length}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionSpecificationTime;
