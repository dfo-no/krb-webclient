import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Button, Type, Variant } from '@dfo-no/components.button';

import css from './QuestionAnswer.module.scss';
import HorizontalTextCtrl from '../../FormProvider/HorizontalTextCtrl';
import Nexus from '../../Nexus/Nexus';
import { ISliderQuestion } from '../../Nexus/entities/ISliderQuestion';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { QuestionVariant } from '../../Nexus/enums';
import FlexRowBox from '../FlexBox/FlexRowBox';
import ValidationUtils from '../../common/ValidationUtils';
import ValidationMessageForm from '../../Form/ValidationMessageForm/ValidationMessageForm';

interface IProps {
  item: ISliderQuestion;
  existingAnswer?: IRequirementAnswer;
  onSubmit: (post: ISliderQuestion) => void;
  isInfo?: boolean;
  isAwardCriteria?: boolean;
}

const QuestionAnswerSlider = ({
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

  const methods = useForm<ISliderQuestion>({
    resolver: nexus.resolverService.answerResolver(QuestionVariant.Q_SLIDER),
    defaultValues: item,
  });

  useEffect(() => {
    if (
      existingAnswer &&
      existingAnswer.question.type === QuestionVariant.Q_SLIDER
    ) {
      methods.reset(existingAnswer.question);
    }
  }, [existingAnswer, methods]);

  const validationMessage = () => {
    if (!isInfo) {
      return existingAnswer &&
        !isAwardCriteria &&
        !ValidationUtils.sliderQuestion(existingAnswer)
        ? ValidationUtils.sliderQuestionValidationMsg(item)
        : ValidationUtils.sliderQuestionValidationMsg(item, true);
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
          onMouseMoveCapture={
            isPrefilledResponse ? undefined : methods.handleSubmit(onSubmit)
          }
        >
          <ValidationMessageForm
            isError={
              !!existingAnswer &&
              !ValidationUtils.sliderQuestion(existingAnswer)
            }
            message={validationMessage()}
          >
            <FlexRowBox>
              <HorizontalTextCtrl
                id={'answerValue'}
                name={'answer.value'}
                placeholder={t('Value')}
                type={'number'}
                adornment={item.config.unit}
                color={isPrefilledResponse ? '' : 'var(--text-primary-color)'}
                isDisabled={isInfo}
              />
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

export default QuestionAnswerSlider;
