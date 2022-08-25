import { Box, styled } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from './Variant.module.scss';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { IVariant } from '../../../../Nexus/entities/IVariant';

const ConfigBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 'var(--small-gap)'
}));

interface IProps {
  index: number;
}

const QuestionConfigSlider = ({ index }: IProps) => {
  const { t } = useTranslation();
  const { control, setValue } = useFormContext<IVariant>();

  const useSliderMin = useWatch({
    name: `questions.${index}.config.min`,
    control
  });
  const useSliderMax = useWatch({
    name: `questions.${index}.config.max`,
    control
  });

  const useSliderMinScore = useWatch({
    name: `questions.${index}.config.scoreValues.0`,
    control
  });
  const useSliderMaxScore = useWatch({
    name: `questions.${index}.config.scoreValues.1`,
    control
  });

  useEffect(() => {
    if (
      useSliderMin &&
      useSliderMinScore &&
      useSliderMin !== useSliderMinScore.value
    ) {
      setValue(`questions.${index}.config.scoreValues.0`, {
        value: useSliderMin,
        score: 0
      });
      setValue(`questions.${index}.answer.value`, useSliderMin);
    }
  }, [index, useSliderMin, useSliderMinScore, setValue]);

  useEffect(() => {
    if (
      useSliderMax &&
      useSliderMaxScore &&
      useSliderMax !== useSliderMaxScore.value
    ) {
      setValue(`questions.${index}.config.scoreValues.1`, {
        value: useSliderMax,
        score: 100
      });
    }
  }, [index, useSliderMax, useSliderMaxScore, setValue]);

  return (
    <ConfigBox>
      <VerticalTextCtrl
        className={css.InputField}
        name={`questions.${index}.config.min`}
        label={t('Minimum')}
        type={'number'}
      />
      <VerticalTextCtrl
        className={css.InputField}
        name={`questions.${index}.config.max`}
        label={t('Maximum')}
        type={'number'}
      />
      <VerticalTextCtrl
        className={css.InputField}
        name={`questions.${index}.config.unit`}
        label={t('Unit')}
      />
      <VerticalTextCtrl
        className={css.InputField}
        name={`questions.${index}.config.step`}
        label={t('Step')}
        type={'number'}
      />
    </ConfigBox>
  );
};

export default QuestionConfigSlider;
