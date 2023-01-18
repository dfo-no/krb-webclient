import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CheckboxCtrl from '../../FormProvider/CheckboxCtrl';
import css from './QuestionAnswer.module.scss';
import Nexus from '../../Nexus/Nexus';
import { IConfirmationQuestion } from '../../Nexus/entities/IConfirmationQuestion';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { QuestionVariant } from '../../Nexus/enums';

interface IProps {
  item: IConfirmationQuestion;
  existingAnswer?: IRequirementAnswer;
  onSubmit: (post: IConfirmationQuestion) => void;
}

const QuestionAnswerConfirmation = ({
  item,
  existingAnswer,
  onSubmit,
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const methods = useForm<IConfirmationQuestion>({
    resolver: nexus.resolverService.answerResolver(
      QuestionVariant.Q_CONFIRMATION
    ),
    defaultValues: item,
  });

  useEffect(() => {
    if (
      existingAnswer &&
      existingAnswer.question.type === QuestionVariant.Q_CONFIRMATION
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
          onChange={methods.handleSubmit(onSubmit)}
          onMouseMoveCapture={methods.handleSubmit(onSubmit)}
        >
          <CheckboxCtrl name={'answer.value'} label={t('Confirm')} />
        </form>
      </FormProvider>
    </div>
  );
};

export default QuestionAnswerConfirmation;
