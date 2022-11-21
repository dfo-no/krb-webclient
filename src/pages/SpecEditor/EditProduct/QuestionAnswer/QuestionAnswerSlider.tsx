import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext, useWatch } from 'react-hook-form';

import css from '../QuestionContent.module.scss';
import SliderCtrl from '../../../../FormProvider/SliderCtrl';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import { ISliderQuestion } from '../../../../Nexus/entities/ISliderQuestion';

interface IProps {
  item: ISliderQuestion;
}

const QuestionAnswerSlider = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();
  const { control } = useFormContext<IRequirementAnswer>();
  const useAnswer = useWatch({ name: 'question.answer.value', control });

  const sliderLabel = `${t('Quantity')} ${item.config.unit}`;

  return (
    <div className={css.QuestionFlex}>
      <SliderCtrl
        className={css.QuestionFlex__slider}
        label={sliderLabel}
        text={useAnswer?.toString()}
        name={'question.answer.value'}
        min={item.config.min}
        max={item.config.max}
        step={item.config.step}
        showValue={false}
      />
    </div>
  );
};

export default QuestionAnswerSlider;
