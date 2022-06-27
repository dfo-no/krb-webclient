import Button from '@mui/material/Button';
import React, { ReactElement } from 'react';

import css from './Evaluation.module.scss';
import Nexus from '../../Nexus/Nexus';
import { setEvaluations } from '../../store/reducers/evaluation-reducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useTranslation } from 'react-i18next';

const EvaluationProcess = (): ReactElement => {
  const { t } = useTranslation();
  const { specification, responses } = useAppSelector(
    (state) => state.evaluation
  );

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
  };

  const isEvaluationDisabled = (): boolean => {
    return responses.length === 0 || specification.bank.id === '';
  };

  return (
    <div className={css.Content}>
      <Button
        className={css.Button}
        variant={'primary'}
        disabled={isEvaluationDisabled()}
        onClick={evaluate}
      >
        {t('EVAL_EVALUATE')}
      </Button>
    </div>
  );
};

export default EvaluationProcess;
