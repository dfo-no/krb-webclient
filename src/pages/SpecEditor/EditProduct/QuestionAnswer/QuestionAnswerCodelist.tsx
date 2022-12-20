import React, { ReactElement } from 'react';

import CodeSelection from '../../../../components/CodeSelection/CodeSelection';
import css from '../QuestionContent.module.scss';
import { ICodelistQuestion } from '../../../../Nexus/entities/ICodelistQuestion';
import { useSpecificationState } from '../../SpecificationContext';

interface IProps {
  item: ICodelistQuestion;
}

const QuestionAnswerCodelist = ({ item }: IProps): ReactElement => {
  const { specification } = useSpecificationState();
  const codesList = specification.bank.codelist.find(
    (cl) => cl.id === item.config.codelist
  )?.codes;

  return (
    <div className={css.QuestionFlex}>
      {codesList && (
        <CodeSelection name={'question.answer.codes'} codesList={codesList} />
      )}
    </div>
  );
};

export default QuestionAnswerCodelist;
