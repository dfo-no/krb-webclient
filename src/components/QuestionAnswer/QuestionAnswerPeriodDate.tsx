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

interface IProps {
  item: IPeriodDateQuestion;
  existingAnswer?: IRequirementAnswer;
  onSubmit: (post: IPeriodDateQuestion) => void;
}

const QuestionAnswerPeriodDate = ({
  item,
  existingAnswer,
  onSubmit,
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
          <DateCtrl
            minDate={item.config.fromBoundary ?? undefined}
            maxDate={item.config.toBoundary ?? undefined}
            name={'answer.fromDate'}
          />
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
