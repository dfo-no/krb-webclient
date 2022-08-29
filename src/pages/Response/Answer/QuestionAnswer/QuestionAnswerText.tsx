import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from '../ProductRequirementAnswer.module.scss';
import Nexus from '../../../../Nexus/Nexus';
import TextAreaCtrl from '../../../../FormProvider/TextAreaCtrl';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../../../store/reducers/response-reducer';
import { QuestionVariant } from '../../../../Nexus/enums';
import { IRequirementAnswer } from '../../../../Nexus/entities/IRequirementAnswer';
import { ITextQuestion } from '../../../../Nexus/entities/ITextQuestion';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useAccordionState } from '../../../../components/DFOAccordion/AccordionContext';
import { useProductIndexState } from '../../../../components/ProductIndexContext/ProductIndexContext';

interface IProps {
  item: ITextQuestion;
  parent: IRequirementAnswer;
  existingAnswer?: IRequirementAnswer;
}

const QuestionAnswerText = ({
  item,
  parent,
  existingAnswer
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const nexus = Nexus.getInstance();
  const { response } = useAppSelector((state) => state.response);
  const { productIndex } = useProductIndexState();
  const { setActiveKey } = useAccordionState();
  const methods = useForm<ITextQuestion>({
    resolver: nexus.resolverService.answerResolver(QuestionVariant.Q_TEXT),
    defaultValues: item
  });

  const useAnswerWatch = useWatch({
    name: 'answer.text',
    control: methods.control
  });

  useEffect(() => {
    if (
      existingAnswer &&
      existingAnswer.question.type === QuestionVariant.Q_TEXT
    ) {
      methods.reset(existingAnswer.question);
    }
  }, [existingAnswer, methods]);

  useEffect(() => {
    if (useAnswerWatch.length > 0) {
      methods.setValue('answer.point', 100);
    } else {
      methods.setValue('answer.point', 0);
    }
  }, [useAnswerWatch, methods]);

  const onSubmit = (post: ITextQuestion): void => {
    const newAnswer = {
      ...parent,
      question: post
    };
    if (productIndex === -1) {
      dispatch(addRequirementAnswer(newAnswer));
    } else {
      dispatch(
        addProductAnswer({
          answer: newAnswer,
          productId: response.products[productIndex].id
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
        <TextAreaCtrl
          name={'answer.text'}
          placeholder={t('Answer')}
          rows={10}
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

export default QuestionAnswerText;
