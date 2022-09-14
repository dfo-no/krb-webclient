import Button from '@mui/material/Button';
import React, { ReactElement } from 'react';

import css from './Evaluation.module.scss';
import Nexus from '../../Nexus/Nexus';
import Utils from '../../common/Utils';
import { useEvaluationState } from './EvaluationContext';
import { useTranslation } from 'react-i18next';

const EvaluationProcess = (): ReactElement => {
  const { t } = useTranslation();
  const { setTab, setEvaluations, responses, specification } =
    useEvaluationState();

  const nexus = Nexus.getInstance();

  const evaluateAll = async () => {
    const evaluated = await nexus.evaluationService.evaluateAll(
      responses.filter((response) =>
        Utils.isValidResponse(response, specification)
      )
    );
    return evaluated;
  };

  const evaluate = async () => {
    const evaluated = await evaluateAll().then((result) => {
      return result;
    });
    setEvaluations(evaluated);
    setTab(3);
  };

  const isEvaluationDisabled = (): boolean => {
    return (
      specification.bank.id === '' ||
      !Utils.hasValidResponses(responses, specification)
    );
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
