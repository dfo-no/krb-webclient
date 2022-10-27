import React, { ReactElement, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormContext, useWatch } from 'react-hook-form';

import css from '../QuestionContent.module.scss';
import SliderCtrl from '../../../../FormProvider/SliderCtrl';
import { IMark } from '../../../../Nexus/entities/IMark';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import { ISliderQuestion } from '../../../../Nexus/entities/ISliderQuestion';

interface IProps {
  item: ISliderQuestion;
}

const QuestionAnswerSlider = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();
  const { control } = useFormContext<IRequirementAnswer>();
  const useAnswer = useWatch({ name: 'question.answer.value', control });

  const [sliderMark, setSliderMark] = useState<IMark[]>([
    { value: +useAnswer, label: `${useAnswer} ${item.config.unit}` },
  ]);

  useEffect(() => {
    setSliderMark([
      { value: +useAnswer, label: `${useAnswer} ${item.config.unit}` },
    ]);
  }, [useAnswer, item.config.unit]);

  return (
    <div className={css.QuestionFlex}>
      <Typography variant={'smBold'}>{t('Answer')}</Typography>
      <SliderCtrl
        name={'question.answer.value'}
        min={item.config.min}
        max={item.config.max}
        step={item.config.step}
        showValue={false}
        marks={sliderMark}
      />
    </div>
  );
};

export default QuestionAnswerSlider;
