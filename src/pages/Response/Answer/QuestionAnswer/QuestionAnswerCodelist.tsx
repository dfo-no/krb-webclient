import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';

import CodeSelection from './CodeSelection';
import css from '../ProductRequirementAnswer.module.scss';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../../../store/reducers/response-reducer';
import {
  CodelistQuestionAnswerSchema,
  ICodelistQuestion
} from '../../../../Nexus/entities/ICodelistQuestion';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useResponseState } from '../../ResponseContext';
import { useAccordionState } from '../../../../components/DFOAccordion/AccordionContext';

interface IProps {
  item: ICodelistQuestion;
  parent: IRequirementAnswer;
  existingAnswer?: ICodelistQuestion;
}

const QuestionAnswerCodelist = ({
  item,
  parent,
  existingAnswer
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { response } = useAppSelector((state) => state.response);
  const codelist = response.specification.bank.codelist.find(
    (cl) => cl.id === item.config.codelist
  );
  const { responseProductIndex } = useResponseState();
  const { setActiveKey } = useAccordionState();
  const methods = useForm<ICodelistQuestion>({
    resolver: joiResolver(CodelistQuestionAnswerSchema),
    defaultValues: item
  });

  const useAnswerWatch = useWatch({
    name: 'answer.codes',
    control: methods.control
  });

  useEffect(() => {
    if (existingAnswer) {
      methods.reset(existingAnswer);
    }
  }, [existingAnswer, methods]);

  useEffect(() => {
    methods.setValue('answer.point', 0);
  }, [useAnswerWatch, methods]);

  const onSubmit = (post: ICodelistQuestion): void => {
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
        <CodeSelection codes={codelist ? codelist.codes : []} />
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

export default QuestionAnswerCodelist;
