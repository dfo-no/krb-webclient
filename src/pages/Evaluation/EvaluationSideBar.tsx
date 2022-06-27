import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
import DownLoad from './DownLoad';
import { useEvaluationState } from './EvaluationContext';
import { useAppSelector } from '../../store/hooks';

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
  const { evaluations } = useAppSelector((state) => state.evaluation);
  const evaluationState = useEvaluationState();

  return (
    <div className={css.SideBar}>
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={index === evaluationState.tab ? css.Active : undefined}
            onClick={() => evaluationState.setTab(index)}
          >
            {t(item.label)}
          </li>
        ))}
      </ul>
      {evaluations.length > 0 && (
        <div className={css.Download}>
          <DownLoad />
        </div>
      )}
    </div>
  );
};

export default EvaluationSideBar;
