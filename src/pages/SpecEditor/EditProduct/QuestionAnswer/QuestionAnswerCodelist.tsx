import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { FlexColumnBox } from '../../../../components/FlexBox/FlexColumnBox';
import { useAppSelector } from '../../../../store/hooks';
import { ICodelistQuestion } from '../../../../Nexus/entities/ICodelistQuestion';
import CodeSelection from '../../../../components/CodeSelection/CodeSelection';

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
      <CodeSelection
        name={'question.answer.codes'}
        codes={codelist ? codelist.codes : []}
      />
    </FlexColumnBox>
  );
};

export default QuestionAnswerCodelist;
