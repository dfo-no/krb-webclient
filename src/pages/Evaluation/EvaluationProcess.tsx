import Button from '@mui/material/Button';
import React, { ReactElement } from 'react';

import css from './Evaluation.module.scss';
import Nexus from '../../Nexus/Nexus';
import { IResponse } from '../../models/IResponse';
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

  const isValid = (response: IResponse): boolean => {
    if (!response.specification || !response.requirementAnswers) {
      return false;
    }

    if (response.specification.bank.id !== specification.bank.id) {
      return false;
    }

    return response.specification.id === specification.id;
  };

  const hasValidResponses = (): boolean => {
    return responses.filter((response) => isValid(response)).length > 0;
  };

  const evaluateAll = async () => {
    const evaluated = await nexus.evaluationService.evaluateAll(
      responses.filter((response) => isValid(response))
    );
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
    return specification.bank.id === '' || !hasValidResponses();
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
