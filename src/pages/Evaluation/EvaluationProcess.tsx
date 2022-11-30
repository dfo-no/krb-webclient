import Button from '@mui/material/Button';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import css from './Evaluation.module.scss';
import Nexus from '../../Nexus/Nexus';
import Utils from '../../common/Utils';
import { useEvaluationState } from './EvaluationContext';

const EvaluationProcess = (): ReactElement => {
  const { t } = useTranslation();
  const { setTab, setEvaluations, responses, specificationUpload } =
    useEvaluationState();

  const nexus = Nexus.getInstance();

  const evaluateAll = () => {
    const evaluated = nexus.evaluationService.evaluateAll(
      responses.filter((response) =>
        Utils.isValidResponse(response, specificationUpload.specification)
      )
    );
    return evaluated;
  };

  const evaluate = () => {
    const evaluated = evaluateAll();
    setEvaluations(evaluated);
    setTab(3);
  };

  const isEvaluationDisabled = (): boolean => {
    return (
      specificationUpload.specification.bank.id === '' ||
      !Utils.hasValidResponses(responses, specificationUpload.specification)
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
