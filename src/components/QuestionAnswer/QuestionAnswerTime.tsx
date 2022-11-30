import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Type, Variant } from '@dfo-no/components.button';

import css from './QuestionAnswer.module.scss';
import Nexus from '../../Nexus/Nexus';
import TimeCtrl from '../../FormProvider/TimeCtrl';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { ITimeQuestion } from '../../Nexus/entities/ITimeQuestion';
import { QuestionVariant } from '../../Nexus/enums';

interface IProps {
  item: ITimeQuestion;
  existingAnswer?: IRequirementAnswer;
  onSubmit: (post: ITimeQuestion) => void;
}

const QuestionAnswerTime = ({
  item,
  existingAnswer,
  onSubmit,
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

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
        >
          <TimeCtrl
            minTime={item.config.fromBoundary ?? undefined}
            maxTime={item.config.toBoundary ?? undefined}
            name={'answer.fromTime'}
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

export default QuestionAnswerTime;
