import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Button, Type, Variant } from '@dfo-no/components.button';

import CheckboxCtrl from '../../FormProvider/CheckboxCtrl';
import css from './QuestionAnswer.module.scss';
import Nexus from '../../Nexus/Nexus';
import { IConfirmationQuestion } from '../../Nexus/entities/IConfirmationQuestion';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { QuestionVariant } from '../../Nexus/enums';
import ValidationUtils from '../../common/ValidationUtils';

interface IProps {
  item: IConfirmationQuestion;
  existingAnswer?: IRequirementAnswer;
  onSubmit: (post: IConfirmationQuestion) => void;
  isInfo?: boolean;
  isAwardCriteria?: boolean;
}

const QuestionAnswerConfirmation = ({
  item,
  existingAnswer,
  onSubmit,
  isInfo,
  isAwardCriteria,
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const location = useLocation();

  const isPrefilledResponse = location.pathname.includes(
    'prefilledresponse'
  ) as boolean;

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
    <>
      {!isInfo && (
        <div className={css.QuestionAnswer}>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              autoComplete="off"
              noValidate
              onChange={
                isPrefilledResponse ? undefined : methods.handleSubmit(onSubmit)
              }
            >
              <CheckboxCtrl
                name={'answer.value'}
                label={t('Confirm')}
                color={isPrefilledResponse ? '' : 'var(--text-primary-color)'}
              />
              {existingAnswer &&
                !isAwardCriteria &&
                !ValidationUtils.confirmationQuestion(existingAnswer) && (
                  <div className={css.error}>
                    {ValidationUtils.confirmationQuestionValidationMsg()}
                  </div>
                )}
              {isPrefilledResponse && (
                <div className={css.Buttons}>
                  <Button type={Type.Submit}>{t('Save')}</Button>
                  <Button
                    variant={Variant.Inverted}
                    onClick={() => methods.reset()}
                  >
                    {t('Reset')}
                  </Button>
                </div>
              )}
            </form>
          </FormProvider>
        </div>
      )}
    </>
  );
};

export default QuestionAnswerConfirmation;
