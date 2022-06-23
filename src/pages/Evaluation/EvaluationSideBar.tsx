import React, { MouseEventHandler, ReactElement, useCallback } from 'react';

import css from './Evaluation.module.scss';
import { useEvaluationState } from './EvaluationContext';
import { useTranslation } from 'react-i18next';

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
  const evaluationState = useEvaluationState();

  const handleTabChange = useCallback(
    (selectedTab: number): MouseEventHandler<HTMLLIElement> => {
      return async () => {
        evaluationState.setTab(selectedTab);
      };
    },
    [evaluationState]
  );

  return (
    <div className={css.SideBar}>
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={index === evaluationState.tab ? css.Active : undefined}
            onClick={handleTabChange(index)}
          >
            {t(item.label)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EvaluationSideBar;
