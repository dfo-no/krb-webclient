import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import CodeSelection from '../../../../components/CodeSelection/CodeSelection';
import { FlexColumnBox } from '../../../../components/FlexBox/FlexColumnBox';
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
    <FlexColumnBox>
      <Typography variant={'smBold'}>{t('Answer')}</Typography>
      {codelist && (
        <CodeSelection name={'question.answer.codes'} codelist={codelist} />
      )}
    </FlexColumnBox>
  );
};

export default QuestionAnswerCodelist;
