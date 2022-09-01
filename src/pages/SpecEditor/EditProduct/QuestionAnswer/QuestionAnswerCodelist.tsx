import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import CodeSelection from '../../../../components/CodeSelection/CodeSelection';
import css from '../QuestionContent.module.scss';
import { ICodelistQuestion } from '../../../../Nexus/entities/ICodelistQuestion';
import { useAppSelector } from '../../../../store/hooks';

interface IProps {
  item: ICodelistQuestion;
}

const QuestionAnswerCodelist = ({ item }: IProps): ReactElement => {
  const { t } = useTranslation();
  const { spec } = useAppSelector((state) => state.specification);
  const codelist = spec.bank.codelist.find(
    (cl) => cl.id === item.config.codelist
  );

  return (
    <div className={css.QuestionFlex}>
      <Typography variant={'smBold'}>{t('Answer')}</Typography>
      {codelist && (
        <CodeSelection name={'question.answer.codes'} codelist={codelist} />
      )}
    </div>
  );
};

export default QuestionAnswerCodelist;
