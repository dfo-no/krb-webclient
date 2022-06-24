import React, { ReactElement } from 'react';
import { EvaluationProvider } from './EvaluationContext';
import Evaluation from './Evaluation';

const EvaluationModule = (): ReactElement => {
  return (
    <EvaluationProvider>
      <Evaluation />
    </EvaluationProvider>
  );
};

export default EvaluationModule;
