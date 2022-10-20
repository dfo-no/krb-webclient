import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from './QuestionAnswer.module.scss';
import Nexus from '../../Nexus/Nexus';
import YesNoSelection from '../YesNoSelection/YesNoSelection';
import { ICheckboxQuestion } from '../../Nexus/entities/ICheckboxQuestion';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { QuestionVariant } from '../../Nexus/enums';

interface IProps {
  item: ICheckboxQuestion;
  existingAnswer?: IRequirementAnswer;
  onSubmit: (post: ICheckboxQuestion) => void;
}

const QuestionAnswerCheckbox = ({
  item,
  existingAnswer,
  onSubmit,
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const methods = useForm<ICheckboxQuestion>({
    resolver: nexus.resolverService.answerResolver(QuestionVariant.Q_CHECKBOX),
    defaultValues: item,
  });

  useEffect(() => {
    if (
      existingAnswer &&
      existingAnswer.question.type === QuestionVariant.Q_CHECKBOX
    ) {
      methods.reset(existingAnswer.question);
    }
  }, [existingAnswer, methods]);

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
