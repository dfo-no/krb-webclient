import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';

import CodeSelection from '../../../../components/CodeSelection/CodeSelection';
import css from '../ProductRequirementAnswer.module.scss';
import Utils from '../../../../common/Utils';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../../../store/reducers/response-reducer';
import {
  CodelistQuestionAnswerSchema,
  ICodelistQuestion
} from '../../../../Nexus/entities/ICodelistQuestion';
import { QuestionVariant } from '../../../../enums';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useResponseState } from '../../ResponseContext';
import { useAccordionState } from '../../../../components/DFOAccordion/AccordionContext';

interface IProps {
  item: ICodelistQuestion;
  parent: IRequirementAnswer;
  existingAnswer?: IRequirementAnswer;
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
    if (
      existingAnswer &&
      existingAnswer.question.type === QuestionVariant.Q_CODELIST
    ) {
      methods.reset(existingAnswer.question);
    }
  }, [existingAnswer, methods]);

  useEffect(() => {
    const score = Utils.findScoreFromCodes(useAnswerWatch, item.config);
    methods.setValue('answer.point', score);
  }, [item, useAnswerWatch, methods]);

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

  const getInfoText = () => {
    return `${t('RESP_ANS_CODELIST_INFO_MIN')} ${
      item.config.optionalCodeMinAmount
    }, ${t('RESP_ANS_CODELIST_INFO_MAX')} ${item.config.optionalCodeMaxAmount}`;
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <Typography variant={'sm'}>{getInfoText()}</Typography>
        {codelist && (
          <CodeSelection
            name={'answer.codes'}
            codelist={codelist}
            codeSelection={item.config.codes}
          />
        )}
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
