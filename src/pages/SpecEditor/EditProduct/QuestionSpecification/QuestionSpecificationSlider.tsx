import { Typography } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import classnames from 'classnames';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import css from '../QuestionContent.module.scss';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import UuidService from '../../../../Nexus/services/UuidService';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import { ISliderQuestion } from '../../../../Nexus/entities/ISliderQuestion';
import { FormIconButton } from '../../../../components/Form/FormIconButton';
import theme from '../../../../theme';
import ArrayUniqueErrorMessage from '../../../../Form/ArrayUniqueErrorMessage';
import { DFOCheckbox } from '../../../../components/DFOCheckbox/DFOCheckbox';

interface IProps {
  item: ISliderQuestion;
}

const QuestionSpecificationSlider = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();
  const { control, setValue, formState } = useFormContext<IRequirementAnswer>();
  const [preferredScore, setPreferredScore] = useState(false);

  const useMinValue = useWatch({ name: 'question.config.min', control });
  const useMaxValue = useWatch({ name: 'question.config.max', control });

  const useMinScore = useWatch({
    name: 'question.config.scoreValues.0',
    control,
  });
  const useMaxScore = useWatch({
    name: 'question.config.scoreValues.1',
    control,
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'question.config.scoreValues',
  });

  useEffect(() => {
    if (!fields.length) {
      append({
        id: new UuidService().generateId(),
        value: 0,
        score: 0,
      });
      append({
        id: new UuidService().generateId(),
        value: 0,
        score: 100,
      });
    }
  }, [fields, append]);

  useEffect(() => {
    if (useMinScore && (useMinValue !== useMinScore.value || !useMinScore.id)) {
      update(0, {
        id: useMinScore.id ?? new UuidService().generateId(),
        value: useMinValue,
        score: useMinScore.score,
      });
      setValue('question.answer.value', useMinValue);
    }
  }, [useMinValue, useMinScore, update, setValue]);

  useEffect(() => {
    if (useMaxScore && (useMaxValue !== useMaxScore.value || !useMaxScore.id)) {
      update(1, {
        id: useMaxScore.id ?? new UuidService().generateId(),
        value: useMaxValue,
        score: useMaxScore.score,
      });
    }
  }, [useMaxValue, useMaxScore, update]);

  const onCheckboxClick = (): void => {
    setPreferredScore((prev) => !prev);
  };

  return (
    <>
      <div className={css.QuestionSlider}>
        <HorizontalTextCtrl
          className={css.QuestionSlider__textCtrl}
          name={'question.config.min'}
          label={t('From')}
          placeholder={t('Minimum')}
          type={'number'}
          adornment={item.config.unit}
        />
        <HorizontalTextCtrl
          className={css.QuestionSlider__textCtrl}
          name={'question.config.step'}
          label={t('Increment')}
          placeholder={t('Increment')}
          type={'number'}
        />
        <HorizontalTextCtrl
          className={css.QuestionSlider__textCtrl}
          name={'question.config.max'}
          label={t('To')}
          placeholder={t('Maximum')}
          type={'number'}
          adornment={item.config.unit}
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
            checked={preferredScore}
            _color={'var(--text-primary-color)'}
          />
          <Typography className={css.CheckboxLabel} variant={'smBold'}>
            {t('Is the requirement an award criteria')}
          </Typography>
        </div>
      </div>
      {preferredScore && (
        <div className={css.QuestionGrid}>
          <Typography
            className={classnames(css.FullRow, css.TopMargin)}
            variant={'smBold'}
          >
            {t('Evaluation')}
          </Typography>
          {fields.map((scoreValue, idx) => {
            return (
              <div
                key={scoreValue.id}
                className={classnames(css.QuestionGrid, css.FullRow)}
              >
                {idx < 2 ? (
                  <Typography variant={'smBold'}>{scoreValue.value}</Typography>
                ) : (
                  <HorizontalTextCtrl
                    name={`question.config.scoreValues[${idx}].value`}
                    placeholder={t('Value')}
                    type={'number'}
                  />
                )}
                <div className={css.Arrow}>
                  <ArrowForwardIcon />
                </div>
                <HorizontalTextCtrl
                  name={`question.config.scoreValues[${idx}].score`}
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
              path={'question.config.scoreValues'}
              length={fields.length}
            />
          </div>
          <Button
            variant="primary"
            onClick={() =>
              append({
                id: new UuidService().generateId(),
                value: useMinValue,
                score: 0,
              })
            }
          >
            {t('Add new value score')}
          </Button>
        </div>
      )}
    </>
  );
};

export default QuestionSpecificationSlider;
