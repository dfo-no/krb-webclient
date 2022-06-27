import Button from '@mui/material/Button';
import React, { ReactElement } from 'react';

import css from './Evaluation.module.scss';
import Nexus from '../../Nexus/Nexus';
import { setEvaluations } from '../../store/reducers/evaluation-reducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEvaluationState } from './EvaluationContext';
import { useTranslation } from 'react-i18next';

const EvaluationProcess = (): ReactElement => {
  const { t } = useTranslation();
  const { specification, responses } = useAppSelector(
    (state) => state.evaluation
  );
  const { setTab } = useEvaluationState();

  const nexus = Nexus.getInstance();
  const dispatch = useAppDispatch();

  const evaluateAll = async () => {
    const evaluated = await nexus.evaluationService.evaluateAll(responses);
    return evaluated;
  };

  const evaluate = async () => {
    const evaluated = await evaluateAll().then((result) => {
      return result;
    });
    dispatch(setEvaluations(evaluated));
    setTab(3);
  };

  const isEvaluationDisabled = (): boolean => {
    return responses.length === 0 || specification.bank.id === '';
  };

  return (
    <div>
      <h1>{t('EVAL_EVALUATE')}</h1>
      <div>
        <Button
          className={css.Button}
          variant={'primary'}
          disabled={isEvaluationDisabled()}
          onClick={evaluate}
        >
          {t('EVAL_EVALUATE')}
        </Button>
      </div>
    </div>
  );
};

export default EvaluationProcess;
