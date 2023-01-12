import React, { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Type, Variant } from '@dfo-no/components.button';

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

  const useAnswerWatch = useWatch({
    name: 'answer.value',
    control: methods.control,
  });

  useEffect(() => {
    if (
      existingAnswer &&
      existingAnswer.question.type === QuestionVariant.Q_CONFIRMATION
    ) {
      methods.reset(existingAnswer.question);
    }
  }, [existingAnswer, methods]);

  useEffect(() => {
    methods.setValue(
      'answer.discount',
      useAnswerWatch ? 100 : item.config.discount
    );
  }, [item.config, useAnswerWatch, methods]);

  return (
    <div className={css.QuestionAnswer}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          <CheckboxCtrl name={'answer.value'} label={t('Confirm')} />
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

export default QuestionAnswerConfirmation;
