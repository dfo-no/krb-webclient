import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
          <Box className={css.Buttons}>
            <Button
              variant="cancel"
              onClick={() => methods.reset()}
              className={css.Cancel}
            >
              {t('Reset')}
            </Button>
            <Button variant="save" type="submit" className={css.Save}>
              {t('Save')}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </div>
  );
};

export default QuestionAnswerTime;
