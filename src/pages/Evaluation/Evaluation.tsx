import classnames from 'classnames';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
import EvaluationList from './EvaluationList';
import EvaluationProcess from './EvaluationProcess';
import EvaluationSideBar from './EvaluationSideBar';
import EvaluationSpec from './EvaluationSpec';
import UploadResponses from './UploadResponses';
import { useAppSelector } from '../../store/hooks';
import { useEvaluationState } from './EvaluationContext';

const Evaluation = (): ReactElement => {
  const { responses } = useAppSelector((state) => state.evaluation);
  const { t } = useTranslation();
  const evaluationState = useEvaluationState();

  const getClassForTabBody = (tab: number): string => {
    return classnames(
      css.TabBody,
      evaluationState.tab === tab ? css.Active : null
    );
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
          <h1>{t('EVAL_RESULTS')}</h1>
          {responses.length !== 0 && <EvaluationList />}
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
