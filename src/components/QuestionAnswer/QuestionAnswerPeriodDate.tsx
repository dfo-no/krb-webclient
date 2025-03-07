import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Button, Type, Variant } from '@dfo-no/components.button';
import { useTranslation } from 'react-i18next';

import css from './QuestionAnswer.module.scss';
import DateCtrl from '../../FormProvider/DateCtrl';
import Nexus from '../../Nexus/Nexus';
import { IPeriodDateQuestion } from '../../Nexus/entities/IPeriodDateQuestion';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { QuestionVariant } from '../../Nexus/enums';
import FlexRowBox from '../FlexBox/FlexRowBox';
import ValidationUtils from '../../common/ValidationUtils';
import ValidationMessageForm from '../../Form/ValidationMessageForm/ValidationMessageForm';

interface IProps {
  item: IPeriodDateQuestion;
  existingAnswer?: IRequirementAnswer;
  onSubmit: (post: IPeriodDateQuestion) => void;
  isInfo?: boolean;
  isAwardCriteria?: boolean;
}

const QuestionAnswerPeriodDate = ({
  item,
  existingAnswer,
  onSubmit,
  isInfo,
  isAwardCriteria,
}: IProps): React.ReactElement => {
  const nexus = Nexus.getInstance();
  const { t } = useTranslation();
  const location = useLocation();

  const isPrefilledResponse = location.pathname.includes(
    'prefilledresponse'
  ) as boolean;

  const methods = useForm<IPeriodDateQuestion>({
    resolver: nexus.resolverService.answerResolver(
      QuestionVariant.Q_PERIOD_DATE
    ),
    defaultValues: item,
  });

  useEffect(() => {
    if (
      existingAnswer &&
      existingAnswer.question.type === QuestionVariant.Q_PERIOD_DATE
    ) {
      methods.reset(existingAnswer.question);
    }
  }, [existingAnswer, methods]);

  const validationMessage = () => {
    if (!isInfo) {
      return existingAnswer &&
        !isAwardCriteria &&
        !ValidationUtils.periodDateQuestion(existingAnswer)
        ? ValidationUtils.periodDateQuestionValidationMsg(item)
        : ValidationUtils.periodDateQuestionValidationMsg(item, true);
    }
  };
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
          <ValidationMessageForm
            isError={
              !!existingAnswer &&
              !ValidationUtils.periodDateQuestion(existingAnswer) &&
              !isAwardCriteria &&
              !isInfo
            }
            message={validationMessage()}
          >
            <FlexRowBox>
              <DateCtrl
                minDate={item.config.fromBoundary ?? undefined}
                maxDate={item.config.toBoundary ?? undefined}
                name={'answer.fromDate'}
                color={isPrefilledResponse ? '' : 'var(--text-primary-color)'}
                isDisabled={isInfo}
              />
              {item.config.isPeriod && (
                <DateCtrl
                  minDate={item.config.fromBoundary ?? undefined}
                  maxDate={item.config.toBoundary ?? undefined}
                  name={'answer.toDate'}
                  color={isPrefilledResponse ? '' : 'var(--text-primary-color)'}
                  isDisabled={isInfo}
                />
              )}
            </FlexRowBox>
          </ValidationMessageForm>
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

export default QuestionAnswerPeriodDate;
