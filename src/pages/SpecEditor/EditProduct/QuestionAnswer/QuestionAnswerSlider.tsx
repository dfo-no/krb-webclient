import React, { ReactElement, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import SliderCtrl from '../../../../FormProvider/SliderCtrl';
import { FlexColumnBox } from '../../../../components/FlexBox/FlexColumnBox';
import { IMark } from '../../../../Nexus/entities/IMark';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import { ISliderQuestion } from '../../../../Nexus/entities/ISliderQuestion';
import { useFormContext, useWatch } from 'react-hook-form';

interface IProps {
  item: ISliderQuestion;
}

const QuestionAnswerSlider = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();
  const { control } = useFormContext<IRequirementAnswer>();
  const useAnswer = useWatch({ name: 'question.answer.value', control });

  const [sliderMark, setSliderMark] = useState<IMark[]>([
    { value: +useAnswer, label: `${useAnswer} ${item.config.unit}` }
  ]);

  useEffect(() => {
    setSliderMark([
      { value: +useAnswer, label: `${useAnswer} ${item.config.unit}` }
    ]);
  }, [useAnswer, item.config.unit]);

  return (
    <FlexColumnBox>
      <Typography variant={'smBold'}>{t('Answer')}</Typography>
      <SliderCtrl
        name={'question.answer.value'}
        min={item.config.min}
        max={item.config.max}
        step={item.config.step}
        showValue={false}
        marks={sliderMark}
      />
    </FlexColumnBox>
  );
};

export default QuestionAnswerSlider;
