import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

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
          onChange={methods.handleSubmit(onSubmit)}
          onMouseMoveCapture={methods.handleSubmit(onSubmit)}
        >
          <YesNoSelection
            name={'answer.value'}
            recommendedAlternative={item.config.preferedAlternative}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default QuestionAnswerCheckbox;
