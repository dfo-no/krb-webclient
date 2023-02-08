import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Button, Type, Variant } from '@dfo-no/components.button';

import css from './QuestionAnswer.module.scss';
import Nexus from '../../Nexus/Nexus';
import TextAreaCtrl from '../../FormProvider/TextAreaCtrl';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { ITextQuestion } from '../../Nexus/entities/ITextQuestion';
import { QuestionVariant } from '../../Nexus/enums';
import ValidationUtils from '../../common/ValidationUtils';
import MessageForm from '../../Form/MessageForm/MessageForm';

interface IProps {
  item: ITextQuestion;
  existingAnswer?: IRequirementAnswer;
  onSubmit: (post: ITextQuestion) => void;
  isInfo?: boolean;
  isAwardCriteria?: boolean;
}

const QuestionAnswerText = ({
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
              <MessageForm
                isError={
                  !!existingAnswer &&
                  !ValidationUtils.textQuestion(existingAnswer) &&
                  !isAwardCriteria
                }
                message={
                  existingAnswer &&
                  !isAwardCriteria &&
                  !ValidationUtils.textQuestion(existingAnswer)
                    ? ValidationUtils.textQuestionValidationMsg()
                    : ''
                }
              >
                <TextAreaCtrl
                  className={css.TextAreaCtrl}
                  name={'answer.text'}
                  placeholder={t('Answer')}
                  rows={3}
                  color={isPrefilledResponse ? '' : 'var(--text-primary-color)'}
                />
              </MessageForm>
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

export default QuestionAnswerText;
