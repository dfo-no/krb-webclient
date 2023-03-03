import classnames from 'classnames';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
import { IEvaluatedResponse } from '../../Nexus/entities/IEvaluatedResponse';
import { useEvaluationState } from './EvaluationContext';

export default function EvaluationResult(): ReactElement {
  const { t } = useTranslation();
  const { evaluations } = useEvaluationState();

  const getSupplierNameFor = (response: IEvaluatedResponse): string => {
    return response.supplier !== ''
      ? response.supplier
      : t('EVAL_SUPPLIER_NAME_MISSING');
  };

  const renderEvaluations = (): ReactElement[] => {
    return evaluations.map((response: IEvaluatedResponse, index) => (
      <li key={index}>
        <div>{getSupplierNameFor(response)}</div>
        <div>{response.offer}</div>
      </li>
    ));
  };

  if (!evaluations.length) {
    return (
      <div className={css.Content}>
        <h1>{t('EVAL_NOT_RUN')}</h1>
      </div>
    );
  }

  return (
    <div className={classnames(css.Content, css.Result)}>
      <ul>{renderEvaluations()}</ul>
    </div>
  );
}
