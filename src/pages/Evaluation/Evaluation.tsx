import React, { ReactElement, useEffect } from 'react';

import css from './Evaluation.module.scss';
import EvaluationProcess from './EvaluationProcess';
import EvaluationResult from './EvaluationResult';
import EvaluationSideBar from './EvaluationSideBar';
import EvaluationSpec from './EvaluationSpec';
import UploadResponses from './UploadResponses';
import { useEvaluationState } from './EvaluationContext';

const Evaluation = (): ReactElement => {
  const {
    setTab,
    tab,
    evaluationSpecification: specification
  } = useEvaluationState();

  useEffect(() => {
    if (!!specification.bank.id) {
      setTab(1);
    }
  }, [specification, setTab]);

  const renderTabContent = (): ReactElement => {
    switch (tab) {
      case 0:
        return <EvaluationSpec />;

      case 1:
        return <UploadResponses />;

      case 2:
        return <EvaluationProcess />;

      case 3:
        return <EvaluationResult />;

      default:
        return <></>;
    }
  };

  return (
    <div className={css.Evaluation}>
      <EvaluationSideBar />

      <div className={css.Content}>{renderTabContent()}</div>
    </div>
  );
};

export default Evaluation;
