import CheckIcon from '@mui/icons-material/Check';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
import DownLoad from './DownLoad';
import Utils from '../../common/Utils';
import { useAppSelector } from '../../store/hooks';
import { useEvaluationState } from './EvaluationContext';

interface ISideBarItem {
  label: string;
}

const menuItems: ISideBarItem[] = [
  { label: 'EVAL_MENU_UPLOAD_SPEC' },
  { label: 'EVAL_MENU_UPLOAD_RESPS' },
  { label: 'EVAL_MENU_MANUAL_EVAL' },
  { label: 'EVAL_MENU_RESULTS' }
];

const EvaluationSideBar = (): ReactElement => {
  const { t } = useTranslation();
  const { responses, specification } = useAppSelector(
    (state) => state.evaluation
  );
  const evaluationState = useEvaluationState();

  const isDone = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!specification.bank.id;
      case 1:
        return Utils.hasValidResponses(responses, specification);
      case 2:
        return evaluationState.evaluations.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className={css.SideBar}>
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={index === evaluationState.tab ? css.Active : undefined}
            onClick={() => evaluationState.setTab(index)}
          >
            <div>{t(item.label)}</div>
            {isDone(index) && <CheckIcon />}
          </li>
        ))}
      </ul>
      {evaluationState.evaluations.length > 0 && (
        <div className={css.Download}>
          <DownLoad />
        </div>
      )}
    </div>
  );
};

export default EvaluationSideBar;
