import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from '../ProductRequirementAnswer.module.scss';
import Nexus from '../../../../Nexus/Nexus';
import TimeCtrl from '../../../../FormProvider/TimeCtrl';
import Utils from '../../../../common/Utils';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../../../store/reducers/response-reducer';
import { QuestionVariant } from '../../../../Nexus/enums';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import { ITimeQuestion } from '../../../../Nexus/entities/ITimeQuestion';
import { useAccordionState } from '../../../../components/DFOAccordion/AccordionContext';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useResponseState } from '../../ResponseContext';

interface IProps {
  item: ITimeQuestion;
  parent: IRequirementAnswer;
  existingAnswer?: IRequirementAnswer;
}

const QuestionAnswerTime = ({
  item,
  parent,
  existingAnswer
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const nexus = Nexus.getInstance();
  const { response } = useAppSelector((state) => state.response);
  const { responseProductIndex } = useResponseState();
  const { setActiveKey } = useAccordionState();

  const methods = useForm<ITimeQuestion>({
    resolver: nexus.resolverService.answerResolver(QuestionVariant.Q_TIME),
    defaultValues: item
  });

  const useAnswerWatch = useWatch({
    name: 'answer.fromTime',
    control: methods.control
  });

  useEffect(() => {
    if (
      existingAnswer &&
      existingAnswer.question.type === QuestionVariant.Q_TIME
    ) {
      methods.reset(existingAnswer.question);
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
