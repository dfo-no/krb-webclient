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

  const useMinDiscount = useWatch({
    name: 'question.config.dateDiscounts.0',
    control,
  });
  const useMaxDiscount = useWatch({
    name: 'question.config.dateDiscounts.1',
    control,
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'question.config.dateDiscounts',
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
      append({ id: new UuidService().generateId(), date: null, discount: 0 });
      append({ id: new UuidService().generateId(), date: null, discount: 0 });
    }
  }, [fields, awardCriteria, append]);

  useEffect(() => {
    if (
      awardCriteria &&
      useMinDiscount &&
      (!DateUtils.sameTime(useFromBoundary, useMinDiscount.date) ||
        !useMinDiscount.id)
    ) {
      update(0, {
        id: useMinDiscount.id ?? new UuidService().generateId(),
        date: useFromBoundary,
        discount: useMinDiscount.discount,
      });
    }
  }, [awardCriteria, useFromBoundary, useMinDiscount, update, append]);

  useEffect(() => {
    if (
      awardCriteria &&
      useMaxDiscount &&
      (!DateUtils.sameTime(useToBoundary, useMaxDiscount.date) ||
        !useMaxDiscount.id)
    ) {
      update(1, {
        id: useMaxDiscount.id ?? new UuidService().generateId(),
        date: useToBoundary,
        discount: useMaxDiscount.discount,
      });
    }
  }, [awardCriteria, useToBoundary, useMaxDiscount, update, append]);

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
                {fields.map((dateDiscount, index) => {
                  return (
                    <div
                      key={dateDiscount.id}
                      className={css.QuestionCriteria__Ctrl}
                    >
                      <DateCtrl
                        className={css.QuestionCriteria__Ctrl__inputCtrl}
                        label={index == 0 ? `${t('Date')}` : ''}
                        name={`question.config.dateDiscounts[${index}].date`}
                        color={'var(--text-primary-color)'}
                      />
                      <HorizontalTextCtrl
                        className={css.QuestionCriteria__Ctrl__inputCtrl}
                        label={index == 0 ? t('Discount') : ''}
                        name={`question.config.dateDiscounts[${index}].discount`}
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
                    path={'question.config.dateDiscounts'}
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
