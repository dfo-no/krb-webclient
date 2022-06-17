import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';

import css from '../ProductRequirementAnswer.module.scss';
import SliderCtrl from '../../../../FormProvider/SliderCtrl';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../../../store/reducers/response-reducer';
import { IMark } from '../../../../Nexus/entities/IMark';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';
import {
  ISliderQuestion,
  SliderQuestionAnswerSchema
} from '../../../../Nexus/entities/ISliderQuestion';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useResponseState } from '../../ResponseContext';
import { useAccordionState } from '../../../../components/DFOAccordion/AccordionContext';
import Utils from '../../../../common/Utils';
import HorizontalTextCtrl from '../../../../FormProvider/HorizontalTextCtrl';
import RadioCtrl from '../../../../FormProvider/RadioCtrl';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import { DFORadio } from '../../../../components/DFORadio/DFORadio';
import theme from '../../../../theme';
import FormControlLabel from '@mui/material/FormControlLabel';

interface IProps {
  item: ISliderQuestion;
  parent: IRequirementAnswer;
  existingAnswer?: ISliderQuestion;
}

const QuestionAnswerSlider = ({
  item,
  parent,
  existingAnswer
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { response } = useAppSelector((state) => state.response);
  const { responseProductIndex } = useResponseState();
  const { setActiveKey } = useAccordionState();
  const [sliderView, setSliderView] = useState(true);
  const options = [
    { value: 'Slider', label: t('Slider'), recommended: false },
    { value: 'Input', label: t('Input'), recommended: false }
  ];
  const methods = useForm<ISliderQuestion>({
    resolver: joiResolver(SliderQuestionAnswerSchema),
    defaultValues: item
  });

  useEffect(() => {
    if (existingAnswer) {
      methods.reset(existingAnswer);
    }
  }, [existingAnswer, methods]);

  const useAnswer = useWatch({
    name: 'answer.value',
    control: methods.control
  });

  const [sliderMark, setSliderMark] = useState<IMark[]>([
    { value: +useAnswer, label: `${useAnswer} ${item.config.unit}` }
  ]);

  useEffect(() => {
    setSliderMark([
      { value: +useAnswer, label: `${useAnswer} ${item.config.unit}` }
    ]);
    const score = Utils.findScoreFromValue(useAnswer, item.config.scoreValues);
    methods.setValue('answer.point', score);
  }, [useAnswer, item.config, methods]);

  const onSubmit = (post: ISliderQuestion): void => {
    const newAnswer = {
      ...parent,
      question: post
    };
    if (responseProductIndex === -1) {
      dispatch(addRequirementAnswer(newAnswer));
    } else {
      dispatch(
        addProductAnswer({
          answer: newAnswer,
          productId: response.products[responseProductIndex].id
        })
      );
    }
    setActiveKey('');
  };

  return (
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
        <Box className={css.buttons}>
          <Button
            variant="cancel"
            onClick={() => methods.reset()}
            className={css.cancel}
          >
            {t('Reset')}
          </Button>
          <Button variant="save" type="submit" className={css.save}>
            {t('Save')}
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default QuestionAnswerSlider;
