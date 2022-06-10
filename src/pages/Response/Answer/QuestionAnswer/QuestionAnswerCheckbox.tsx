import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';

import css from '../ProductRequirementAnswer.module.scss';
import YesNoSelection from '../../../../components/YesNoSelection/YesNoSelection';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../../../store/reducers/response-reducer';
import {
  CheckboxQuestionAnswerSchema,
  ICheckboxQuestion
} from '../../../../Nexus/entities/ICheckboxQuestion';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useResponseState } from '../../ResponseContext';
import { useAccordionState } from '../../../../components/DFOAccordion/AccordionContext';

interface IProps {
  item: ICheckboxQuestion;
  parent: IRequirementAnswer;
  existingAnswer?: IRequirementAnswer;
}

const QuestionAnswerCheckbox = ({
  item,
  parent
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { response } = useAppSelector((state) => state.response);
  const { responseProductIndex } = useResponseState();
  const { setActiveKey } = useAccordionState();
  const methods = useForm<ICheckboxQuestion>({
    resolver: joiResolver(CheckboxQuestionAnswerSchema),
    defaultValues: item
  });

  const useAnswerWatch = useWatch({
    name: 'answer.value',
    control: methods.control
  });

  useEffect(() => {
    if (item.config.preferedAlternative === useAnswerWatch) {
      methods.setValue('answer.point', 100);
    } else {
      methods.setValue('answer.point', item.config.pointsNonPrefered);
    }
  }, [item, useAnswerWatch, methods]);

  const onSubmit = (post: ICheckboxQuestion): void => {
    const newAnswer = {
      ...parent
    };
    newAnswer.question = post;
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
        <YesNoSelection
          name={'answer.value'}
          recommendedAlternative={item.config.preferedAlternative}
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

export default QuestionAnswerCheckbox;
