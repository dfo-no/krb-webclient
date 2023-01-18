import React, { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import css from './QuestionAnswer.module.scss';
import HorizontalTextCtrl from '../../FormProvider/HorizontalTextCtrl';
import Nexus from '../../Nexus/Nexus';
import { ISliderQuestion } from '../../Nexus/entities/ISliderQuestion';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { QuestionVariant } from '../../Nexus/enums';

interface IProps {
  item: ISliderQuestion;
  existingAnswer?: IRequirementAnswer;
  onSubmit: (post: ISliderQuestion) => void;
}

const QuestionAnswerSlider = ({
  item,
  existingAnswer,
  onSubmit,
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const methods = useForm<ISliderQuestion>({
    resolver: nexus.resolverService.answerResolver(QuestionVariant.Q_SLIDER),
    defaultValues: item,
  });

  const useAnswerValue = useWatch({
    name: 'answer.value',
    control: methods.control,
  });

  useEffect(() => {
    if (
      existingAnswer &&
      existingAnswer.question.type === QuestionVariant.Q_SLIDER
    ) {
      methods.reset(existingAnswer.question);
    }
  }, [existingAnswer, methods]);

  useEffect(() => {
    if (useAnswerValue !== null) {
      setTimeout(() => {
        const answerValueInput = document.getElementById('answerValue');
        if (answerValueInput) {
          answerValueInput?.focus();
        }
      }, 1000);
    }
  }, [useAnswerValue]);

  return (
    <div className={css.QuestionAnswer}>
      <FormProvider {...methods}>
        <form
          autoComplete="off"
          noValidate
          onBlur={methods.handleSubmit(onSubmit)}
          onChange={methods.handleSubmit(onSubmit)}
        >
          <HorizontalTextCtrl
            id={'answerValue'}
            name={'answer.value'}
            placeholder={t('Value')}
            type={'number'}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default QuestionAnswerSlider;
