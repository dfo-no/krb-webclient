import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import CodeSelection from '../CodeSelection/CodeSelection';
import css from './QuestionAnswer.module.scss';
import Nexus from '../../Nexus/Nexus';
import { ICodelistQuestion } from '../../Nexus/entities/ICodelistQuestion';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { QuestionVariant } from '../../Nexus/enums';
import { ICode } from '../../Nexus/entities/ICode';
import { Parentable } from '../../models/Parentable';
import { ICodelist } from '../../Nexus/entities/ICodelist';

interface IProps {
  item: ICodelistQuestion;
  existingAnswer?: IRequirementAnswer;
  onSubmit: (post: ICodelistQuestion) => void;
  codesList?: Parentable<ICode>[];
  codeList?: ICodelist;
}

const QuestionAnswerCodelist = ({
  item,
  existingAnswer,
  onSubmit,
  codesList,
  codeList
}: IProps): React.ReactElement => {
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const methods = useForm<ICodelistQuestion>({
    resolver: nexus.resolverService.answerResolver(QuestionVariant.Q_CODELIST),
    defaultValues: item
  });

  useEffect(() => {
    if (
      existingAnswer &&
      existingAnswer.question.type === QuestionVariant.Q_CODELIST
    ) {
      methods.reset(existingAnswer.question);
    }
  }, [existingAnswer, methods]);

  const getInfoText = () => {
    return `${t('RESP_ANS_CODELIST_INFO_MIN')} ${
      item.config.optionalCodeMinAmount
    }, ${t('RESP_ANS_CODELIST_INFO_MAX')} ${item.config.optionalCodeMaxAmount}`;
  };

  return (
    <div className={css.QuestionAnswer}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          <Typography variant={'sm'}>{getInfoText()}</Typography>
          {codesList && (
            <CodeSelection
              name={'answer.codes'}
              codesList={codesList}
              codeSelection={item.config.codes}
              codeList={codeList}
            />
          )}
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

export default QuestionAnswerCodelist;
