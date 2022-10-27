import React, { useEffect, useState } from 'react';
import { Box, Button, FormControlLabel, Typography } from '@mui/material';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';

import css from './QuestionAnswer.module.scss';
import HorizontalTextCtrl from '../../FormProvider/HorizontalTextCtrl';
import Nexus from '../../Nexus/Nexus';
import SliderCtrl from '../../FormProvider/SliderCtrl';
import theme from '../../theme';
import { DFORadio } from '../DFORadio/DFORadio';
import { ISliderQuestion } from '../../Nexus/entities/ISliderQuestion';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { QuestionVariant } from '../../Nexus/enums';
import { IMark } from '../../Nexus/entities/IMark';

interface IProps {
  item: ISliderQuestion;
  existingAnswer?: IRequirementAnswer;
  onSubmit: (post: ISliderQuestion) => void;
}

const QuestionAnswerSlider = ({
  item,
  existingAnswer,
  onSubmit,
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const [sliderView, setSliderView] = useState(true);
  const options = [
    { value: 'Slider', label: t('Slider'), recommended: false },
    { value: 'Input', label: t('Input'), recommended: false },
  ];

  const methods = useForm<ISliderQuestion>({
    resolver: nexus.resolverService.answerResolver(QuestionVariant.Q_SLIDER),
    defaultValues: item,
  });

  const useAnswerWatch = useWatch({
    name: 'answer.value',
    control: methods.control,
  });

  const [sliderMark, setSliderMark] = useState<IMark[]>([
    { value: +useAnswerWatch, label: `${useAnswerWatch} ${item.config.unit}` },
  ]);

  useEffect(() => {
    if (
      existingAnswer &&
      existingAnswer.question.type === QuestionVariant.Q_SLIDER
    ) {
      methods.reset(existingAnswer.question);
    }
  }, [existingAnswer, methods]);

  useEffect(() => {
    setSliderMark([
      {
        value: +useAnswerWatch,
        label: `${useAnswerWatch} ${item.config.unit}`,
      },
    ]);
  }, [item.config, useAnswerWatch]);

  return (
    <div className={css.QuestionAnswer}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          {sliderView ? (
            <SliderCtrl
              name={'answer.value'}
              min={item.config.min}
              max={item.config.max}
              step={item.config.step}
              showValue={false}
              marks={sliderMark}
            />
          ) : (
            <HorizontalTextCtrl
              name={'answer.value'}
              placeholder={t('Value')}
              type={'number'}
            />
          )}
          <RadioGroup
            row={true}
            value={options[sliderView ? 0 : 1].value}
            onClick={() => setSliderView(!sliderView)}
          >
            {options.map((option) => {
              return (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<DFORadio />}
                  label={
                    <Typography variant={'sm'} color={theme.palette.black.main}>
                      {option.label}
                    </Typography>
                  }
                />
              );
            })}
          </RadioGroup>
          <Box className={css.Buttons}>
            <Button
              variant="cancel"
              onClick={() => methods.reset()}
              className={css.Cancel}
            >
              {t('Reset')}
            </Button>
            <Button variant="save" type="submit" className={css.Save}>
              {t('Save')}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </div>
  );
};

export default QuestionAnswerSlider;
