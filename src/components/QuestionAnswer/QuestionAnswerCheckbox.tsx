import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Type, Variant } from '@dfo-no/components.button';

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
          <div className={css.Buttons}>
            <Button type={Type.Submit}>{t('Save')}</Button>
            <Button variant={Variant.Inverted} onClick={() => methods.reset()}>
              {t('Reset')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default QuestionAnswerCheckbox;
