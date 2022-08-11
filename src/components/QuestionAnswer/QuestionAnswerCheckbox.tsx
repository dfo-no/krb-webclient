import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';

import css from './QuestionAnswer.module.scss';
import YesNoSelection from '../YesNoSelection/YesNoSelection';
import {
  CheckboxQuestionAnswerSchema,
  ICheckboxQuestion
} from '../../Nexus/entities/ICheckboxQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { QuestionVariant } from '../../enums';

interface IProps {
  item: ICheckboxQuestion;
  existingAnswer?: IRequirementAnswer;
  onSubmit: (post: ICheckboxQuestion) => void;
}

const QuestionAnswerCheckbox = ({
  item,
  existingAnswer,
  onSubmit
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const methods = useForm<ICheckboxQuestion>({
    resolver: joiResolver(CheckboxQuestionAnswerSchema),
    defaultValues: item
  });

  const useAnswerWatch = useWatch({
    name: 'answer.value',
    control: methods.control
  });

  useEffect(() => {
    if (
      existingAnswer &&
      existingAnswer.question.type === QuestionVariant.Q_CHECKBOX
    ) {
      methods.reset(existingAnswer.question);
    }
  }, [existingAnswer, methods]);

  useEffect(() => {
    const preferred = `${item.config.preferedAlternative}`;
    const newAnswer = `${useAnswerWatch}`;
    if (preferred === newAnswer) {
      methods.setValue('answer.point', 100);
    } else {
      methods.setValue('answer.point', item.config.pointsNonPrefered);
    }
  }, [item.config, useAnswerWatch, methods]);

  return (
    <div className={css.QuestionAnswer}>
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

export default QuestionAnswerCheckbox;
