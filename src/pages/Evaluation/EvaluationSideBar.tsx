import CheckIcon from '@mui/icons-material/Check';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
import DownLoad from './DownLoad';
import Utils from '../../common/Utils';
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
  const { evaluations, responses, specificationUpload, tab, setTab } =
    useEvaluationState();

  const isDone = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!specificationUpload.specification.bank.id;
      case 1:
        return Utils.hasValidResponses(
          responses,
          specificationUpload.specification
        );
      case 2:
        return evaluations.length > 0;
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
            className={index === tab ? css.Active : undefined}
            onClick={() => setTab(index)}
          >
            <div>{t(item.label)}</div>
            {isDone(index) && <CheckIcon />}
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
