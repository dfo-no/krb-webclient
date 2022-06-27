import classnames from 'classnames';
import React, { ReactElement, useEffect } from 'react';

import css from './Evaluation.module.scss';
import EvaluationProcess from './EvaluationProcess';
import EvaluationResult from './EvaluationResult';
import EvaluationSideBar from './EvaluationSideBar';
import EvaluationSpec from './EvaluationSpec';
import UploadResponses from './UploadResponses';
import { useAppSelector } from '../../store/hooks';
import { useEvaluationState } from './EvaluationContext';

const Evaluation = (): ReactElement => {
  const { specification } = useAppSelector((state) => state.evaluation);
  const { setTab, tab } = useEvaluationState();

  useEffect(() => {
    if (!!specification.bank.id) {
      setTab(1);
    }
  }, [specification, setTab]);

  const getClassForTabBody = (currentTab: number): string => {
    return classnames(css.TabBody, tab === currentTab ? css.Active : null);
  };

  return (
    <div className={css.Evaluation}>
      <EvaluationSideBar />

      <div className={css.Content}>
        <div className={getClassForTabBody(0)}>
          <EvaluationSpec />
        </div>

        <div className={getClassForTabBody(1)}>
          <UploadResponses />
        </div>

        <div className={getClassForTabBody(2)}>
          <EvaluationProcess />
        </div>

        <div className={getClassForTabBody(3)}>
          <EvaluationResult />
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
