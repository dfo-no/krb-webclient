import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from './QuestionAnswer.module.scss';
import Nexus from '../../Nexus/Nexus';
import TextAreaCtrl from '../../FormProvider/TextAreaCtrl';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { ITextQuestion } from '../../Nexus/entities/ITextQuestion';
import { QuestionVariant } from '../../Nexus/enums';

interface IProps {
  item: ITextQuestion;
  existingAnswer?: IRequirementAnswer;
  onSubmit: (post: ITextQuestion) => void;
}

const QuestionAnswerText = ({
  item,
  existingAnswer,
  onSubmit,
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const methods = useForm<ITextQuestion>({
    resolver: nexus.resolverService.answerResolver(QuestionVariant.Q_TEXT),
    defaultValues: item,
  });

  useEffect(() => {
    if (
      existingAnswer &&
      existingAnswer.question.type === QuestionVariant.Q_TEXT
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
          <TextAreaCtrl
            name={'answer.text'}
            placeholder={t('Answer')}
            rows={10}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default QuestionAnswerText;
