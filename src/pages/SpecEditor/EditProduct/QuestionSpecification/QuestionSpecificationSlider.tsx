import { Typography } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, Location, Variant } from '@dfo-no/components.button';
import { Symbols } from '@dfo-no/components.icon';

import css from '../QuestionContent.module.scss';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import UuidService from '../../../../Nexus/services/UuidService';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import { ISliderQuestion } from '../../../../Nexus/entities/ISliderQuestion';
import ArrayUniqueErrorMessage from '../../../../Form/ArrayUniqueErrorMessage';
import { DFOCheckbox } from '../../../../components/DFOCheckbox/DFOCheckbox';
import ToolbarItem from '../../../../components/UI/Toolbar/ToolbarItem';

interface IProps {
  item: ISliderQuestion;
}

const QuestionSpecificationSlider = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();
  const { control, setValue, formState } = useFormContext<IRequirementAnswer>();
  const [awardCriteria, setAwardCriteria] = useState(false);

  const useMinValue = useWatch({ name: 'question.config.min', control });
  const useMaxValue = useWatch({ name: 'question.config.max', control });

  const useMinDiscount = useWatch({
    name: 'question.config.discountsValue.0',
    control,
  });
  const useMaxDiscount = useWatch({
    name: 'question.config.discountsValue.1',
    control,
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'question.config.discountsValue',
  });

  useEffect(() => {
    if (!fields.length && awardCriteria) {
      append({
        id: new UuidService().generateId(),
        value: 0,
        discount: 0,
      });
      append({
        id: new UuidService().generateId(),
        value: 0,
        discount: 0,
      });
    }
  }, [fields, awardCriteria, append]);

  useEffect(() => {
    if (
      awardCriteria &&
      useMinDiscount &&
      (useMinValue !== useMinDiscount.value || !useMinDiscount.id)
    ) {
      update(0, {
        id: useMinDiscount.id ?? new UuidService().generateId(),
        value: useMinValue,
        discount: useMinDiscount.discount,
      });
      setValue('question.answer.value', useMinValue);
    }
  }, [awardCriteria, useMinValue, useMinDiscount, update, setValue]);

  useEffect(() => {
    if (
      awardCriteria &&
      useMaxDiscount &&
      (useMaxValue !== useMaxDiscount.value || !useMaxDiscount.id)
    ) {
      update(1, {
        id: useMaxDiscount.id ?? new UuidService().generateId(),
        value: useMaxValue,
        discount: useMaxDiscount.discount,
      });
    }
  }, [awardCriteria, useMaxValue, useMaxDiscount, update]);

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
    <div className={css.QuestionSliderContainer}>
      <div className={css.QuestionSlider}>
        <HorizontalTextCtrl
          className={css.QuestionSlider__textCtrl}
          name={'question.config.min'}
          label={t('From')}
          placeholder={t('Minimum')}
          type={'number'}
          adornment={item.config.unit}
          color={'var(--text-primary-color)'}
        />
        <HorizontalTextCtrl
          className={css.QuestionSlider__textCtrl}
          name={'question.config.step'}
          label={t('Increment')}
          placeholder={t('Increment')}
          type={'number'}
          color={'var(--text-primary-color)'}
        />
        <HorizontalTextCtrl
          className={css.QuestionSlider__textCtrl}
          name={'question.config.max'}
          label={t('To')}
          placeholder={t('Maximum')}
          type={'number'}
          adornment={item.config.unit}
          color={'var(--text-primary-color)'}
        />
        <Typography variant={'sm'}>
          {t('Minimum')}: {item.config.min}
        </Typography>
        <br />
        <Typography variant={'sm'}>
          {t('Maximum')}: {item.config.max}
        </Typography>
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
              {fields.map((scoreValue, index) => {
                return (
                  <div
                    key={scoreValue.id}
                    className={css.QuestionCriteria__Ctrl}
                  >
                    <HorizontalTextCtrl
                      className={css.QuestionCriteria__Ctrl__inputCtrl}
                      label={
                        index == 0 ? `${t('Quantity')} ${item.config.unit}` : ''
                      }
                      name={`question.config.discountsValue[${index}].value`}
                      placeholder={t('Value')}
                      type={'number'}
                      adornment={item.config.unit}
                      color={'var(--text-primary-color)'}
                    />
                    <HorizontalTextCtrl
                      className={css.QuestionCriteria__Ctrl__inputCtrl}
                      label={index == 0 ? t('Discount') : ''}
                      name={`question.config.discountsValue[${index}].discount`}
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
                            value: useMinValue,
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
                  path={'question.config.discountsValue'}
                  length={fields.length}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionSpecificationSlider;
