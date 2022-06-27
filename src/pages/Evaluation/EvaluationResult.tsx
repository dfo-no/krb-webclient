import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
import DownLoad from './DownLoad';
import { IEvaluatedResponse } from '../../Nexus/entities/IEvaluatedResponse';
import { useAppSelector } from '../../store/hooks';

export default function EvaluationResult(): ReactElement {
  const { evaluations } = useAppSelector((state) => state.evaluation);
  const { t } = useTranslation();

  const getScoreAsPercentage = (points: number): number => {
    return Math.round(points / 0.01);
  };

  const getSupplierNameFor = (response: IEvaluatedResponse): string => {
    return response.supplier !== ''
      ? response.supplier
      : t('EVAL_SUPPLIER_NAME_MISSING');
  };

  const renderEvaluations = (): ReactElement[] => {
    return evaluations.map((response: IEvaluatedResponse, index) => (
      <li key={index}>
        <div>{getSupplierNameFor(response)}</div>
        <div>{getScoreAsPercentage(response.points)}%</div>
      </li>
    ));
  };

  if (!evaluations.length) {
    return (
      <div className={css.Result}>
        <h1>{t('EVAL_NOT_RUN')}</h1>
      </div>
    );
  }

  return (
    <div className={css.Result}>
      <h1>{t('EVAL_RESULTS')}</h1>
      <ul>{renderEvaluations()}</ul>
      <DownLoad />
    </div>
  );
}
