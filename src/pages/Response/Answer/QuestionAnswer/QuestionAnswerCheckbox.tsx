import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import CheckboxCtrl from '../../../../FormProvider/CheckboxCtrl';
import {
  CheckboxQuestionAnswerSchema,
  ICheckboxQuestion
} from '../../../../Nexus/entities/ICheckboxQuestion';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  addProductAnswer,
  addRequirementAnswer
} from '../../../../store/reducers/response-reducer';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { IRequirementAnswer } from '../../../../models/IRequirementAnswer';
import { useResponseState } from '../../ResponseContext';
import { Box, Button } from '@mui/material';
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
        <CheckboxCtrl name={'answer.value'} label={t('Yes/No')} />
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
          <Button
            variant="cancel"
            onClick={() => methods.reset()}
            sx={{ marginLeft: 'auto', marginRight: 2 }}
          >
            {t('Reset')}
          </Button>
          <Button variant="save" type="submit">
            {t('Save')}
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default QuestionAnswerCheckbox;
