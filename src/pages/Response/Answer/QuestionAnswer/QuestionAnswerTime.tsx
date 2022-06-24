import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';

import css from '../ProductRequirementAnswer.module.scss';
import TimeCtrl from '../../../../FormProvider/TimeCtrl';
import Utils from '../../../../common/Utils';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../../../store/reducers/response-reducer';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';
import {
  ITimeQuestion,
  TimeAnswerSchema
} from '../../../../Nexus/entities/ITimeQuestion';
import { useAccordionState } from '../../../../components/DFOAccordion/AccordionContext';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useResponseState } from '../../ResponseContext';

interface IProps {
  item: ITimeQuestion;
  parent: IRequirementAnswer;
  existingAnswer?: ITimeQuestion;
}

const QuestionAnswerTime = ({
  item,
  parent,
  existingAnswer
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { response } = useAppSelector((state) => state.response);
  const { responseProductIndex } = useResponseState();
  const { setActiveKey } = useAccordionState();
  const methods = useForm<ITimeQuestion>({
    resolver: joiResolver(TimeAnswerSchema),
    defaultValues: item
  });

  const useAnswerWatch = useWatch({
    name: 'answer.fromTime',
    control: methods.control
  });

  useEffect(() => {
    if (existingAnswer) {
      methods.reset(existingAnswer);
    }
  }, [existingAnswer, methods]);

  useEffect(() => {
    const score = Utils.findScoreFromTime(
      useAnswerWatch,
      item.config.timeScores
    );
    methods.setValue('answer.point', score);
  }, [useAnswerWatch, item.config, methods]);

  const onSubmit = (post: ITimeQuestion): void => {
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
        <TimeCtrl
          minTime={item.config.fromBoundary ?? undefined}
          maxTime={item.config.toBoundary ?? undefined}
          name={'answer.fromTime'}
        />
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

export default QuestionAnswerTime;
