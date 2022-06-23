import classnames from 'classnames';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
import EvaluationList from './EvaluationList';
import EvaluationSideBar from './EvaluationSideBar';
import EvaluationSpec from './EvaluationSpec';
import UploadResponses from './UploadResponses';
import { useAppSelector } from '../../store/hooks';
import { useEvaluationState } from './EvaluationContext';
import EvaluationProcess from './EvaluationProcess';

const Evaluation = (): ReactElement => {
  const { responses } = useAppSelector((state) => state.evaluation);
  const { t } = useTranslation();
  const evaluationState = useEvaluationState();

  return (
    <div className={css.Evaluation}>
      <EvaluationSideBar />

      <div className={css.Content}>
        <div
          className={classnames(
            css.Tab,
            evaluationState.tab === 0 ? css.Active : null
          )}
        >
          <EvaluationSpec />
        </div>

        <div
          className={classnames(
            css.Tab,
            evaluationState.tab === 1 ? css.Active : null
          )}
        >
          <UploadResponses />
        </div>

        <div
          className={classnames(
            css.Tab,
            evaluationState.tab === 2 ? css.Active : null
          )}
        >
          <EvaluationProcess />
        </div>

        <div
          className={classnames(
            css.Tab,
            evaluationState.tab === 3 ? css.Active : null
          )}
        >
          <h1>{t('EVAL_RESULTS')}</h1>
          {responses.length !== 0 && <EvaluationList />}
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
