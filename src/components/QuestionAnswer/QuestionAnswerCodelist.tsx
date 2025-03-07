import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Button, Type, Variant } from '@dfo-no/components.button';

import CodeSelection from '../CodeSelection/CodeSelection';
import css from './QuestionAnswer.module.scss';
import Nexus from '../../Nexus/Nexus';
import { ICodelistQuestion } from '../../Nexus/entities/ICodelistQuestion';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { QuestionVariant } from '../../Nexus/enums';
import { ICode } from '../../Nexus/entities/ICode';
import { Parentable } from '../../models/Parentable';

interface IProps {
  item: ICodelistQuestion;
  existingAnswer?: IRequirementAnswer;
  onSubmit: (post: ICodelistQuestion) => void;
  codesList?: Parentable<ICode>[];
  isInfo?: boolean;
  isAwardCriteria?: boolean;
}

const QuestionAnswerCodelist = ({
  item,
  existingAnswer,
  onSubmit,
  codesList,
  isInfo,
  isAwardCriteria,
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const location = useLocation();

  const isPrefilledResponse = location.pathname.includes(
    'prefilledresponse'
  ) as boolean;

  const methods = useForm<ICodelistQuestion>({
    resolver: nexus.resolverService.answerResolver(QuestionVariant.Q_CODELIST),
    defaultValues: item,
  });

  useEffect(() => {
    if (
      existingAnswer &&
      existingAnswer.question.type === QuestionVariant.Q_CODELIST
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
        >
          {codesList && (
            <CodeSelection
              name={'answer.codes'}
              question={item}
              existingAnswer={existingAnswer}
              codesList={codesList}
              codeSelection={item.config.codes}
              isDisabled={isInfo}
              isAwardCriteria={isAwardCriteria}
            />
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
  );
};

export default QuestionAnswerCodelist;
