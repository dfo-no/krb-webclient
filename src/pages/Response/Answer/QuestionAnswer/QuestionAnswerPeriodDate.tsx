import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from '../ProductRequirementAnswer.module.scss';
import DateCtrl from '../../../../FormProvider/DateCtrl';
import Nexus from '../../../../Nexus/Nexus';
import Utils from '../../../../common/Utils';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../../../store/reducers/response-reducer';
import { IPeriodDateQuestion } from '../../../../Nexus/entities/IPeriodDateQuestion';
import { QuestionVariant } from '../../../../Nexus/enums';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import { useAccordionState } from '../../../../components/DFOAccordion/AccordionContext';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useResponseState } from '../../ResponseContext';

interface IProps {
  item: IPeriodDateQuestion;
  parent: IRequirementAnswer;
  existingAnswer?: IRequirementAnswer;
}

const QuestionAnswerPeriodDate = ({
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
  const methods = useForm<IPeriodDateQuestion>({
    resolver: nexus.resolverService.answerResolver(
      QuestionVariant.Q_PERIOD_DATE
    ),
    defaultValues: item
  });

  const useAnswerWatch = useWatch({
    name: 'answer.fromDate',
    control: methods.control
  });

  useEffect(() => {
    if (
      existingAnswer &&
      existingAnswer.question.type === QuestionVariant.Q_PERIOD_DATE
    ) {
      methods.reset(existingAnswer.question);
    }
  }, [existingAnswer, methods]);

  useEffect(() => {
    const score = Utils.findScoreFromDate(
      useAnswerWatch,
      item.config.dateScores
    );
    methods.setValue('answer.point', score);
  }, [useAnswerWatch, item.config, methods]);

  const onSubmit = (post: IPeriodDateQuestion): void => {
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
        <DateCtrl
          minDate={item.config.fromBoundary ?? undefined}
          maxDate={item.config.toBoundary ?? undefined}
          name={'answer.fromDate'}
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

export default QuestionAnswerPeriodDate;
