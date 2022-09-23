import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import CodeSelection from '../../../../components/CodeSelection/CodeSelection';
import css from '../QuestionContent.module.scss';
import { ICodelistQuestion } from '../../../../Nexus/entities/ICodelistQuestion';
import { useSpecificationState } from '../../SpecificationContext';

interface IProps {
  item: ICodelistQuestion;
}

const QuestionAnswerCodelist = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();
  const { specification } = useSpecificationState();
  const codesList = specification.bank.codelist.find(
    (cl) => cl.id === item.config.codelist
  )?.codes;

  return (
    <div className={css.QuestionFlex}>
      <Typography variant={'smBold'}>{t('Answer')}</Typography>
      {codesList && (
        <CodeSelection name={'question.answer.codes'} codesList={codesList} />
      )}
    </div>
  );
};

export default QuestionAnswerCodelist;
