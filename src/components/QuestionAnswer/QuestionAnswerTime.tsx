import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Button, Type, Variant } from '@dfo-no/components.button';
import { useTranslation } from 'react-i18next';

import css from './QuestionAnswer.module.scss';
import Nexus from '../../Nexus/Nexus';
import TimeCtrl from '../../FormProvider/TimeCtrl';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { ITimeQuestion } from '../../Nexus/entities/ITimeQuestion';
import { QuestionVariant } from '../../Nexus/enums';
import FlexRowBox from '../FlexBox/FlexRowBox';
import ValidationUtils from '../../common/ValidationUtils';
import MessageForm from '../../Form/MessageForm/MessageForm';

interface IProps {
  item: ITimeQuestion;
  existingAnswer?: IRequirementAnswer;
  onSubmit: (post: ITimeQuestion) => void;
  isInfo?: boolean;
  isAwardCriteria?: boolean;
}

const QuestionAnswerTime = ({
  item,
  existingAnswer,
  onSubmit,
  isInfo,
  isAwardCriteria,
}: IProps): React.ReactElement => {
  const nexus = Nexus.getInstance();
  const location = useLocation();
  const { t } = useTranslation();

  const isPrefilledResponse = location.pathname.includes(
    'prefilledresponse'
  ) as boolean;

  const methods = useForm<ITimeQuestion>({
    resolver: nexus.resolverService.answerResolver(QuestionVariant.Q_TIME),
    defaultValues: item,
  });

  useEffect(() => {
    if (
      existingAnswer &&
      existingAnswer.question.type === QuestionVariant.Q_TIME
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
          onChange={
            isPrefilledResponse ? undefined : methods.handleSubmit(onSubmit)
          }
          onBlur={
            isPrefilledResponse ? undefined : methods.handleSubmit(onSubmit)
          }
        >
          <MessageForm
            isError={
              !!existingAnswer &&
              !ValidationUtils.timeQuestion(existingAnswer) &&
              !isAwardCriteria
            }
            message={
              existingAnswer &&
              !isAwardCriteria &&
              !ValidationUtils.timeQuestion(existingAnswer)
                ? ValidationUtils.timeQuestionValidationMsg(item)
                : ValidationUtils.timeQuestionValidationMsg(item, true)
            }
          >
            <FlexRowBox>
              <TimeCtrl
                minTime={item.config.fromBoundary ?? undefined}
                maxTime={item.config.toBoundary ?? undefined}
                name={'answer.fromTime'}
                color={isPrefilledResponse ? '' : 'var(--text-primary-color)'}
                isDisabled={isInfo}
              />
              {item.config.isPeriod && (
                <TimeCtrl
                  minTime={item.config.fromBoundary ?? undefined}
                  maxTime={item.config.toBoundary ?? undefined}
                  name={'answer.toTime'}
                  color={isPrefilledResponse ? '' : 'var(--text-primary-color)'}
                  isDisabled={isInfo}
                />
              )}
            </FlexRowBox>
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
  );
};

export default QuestionAnswerTime;
