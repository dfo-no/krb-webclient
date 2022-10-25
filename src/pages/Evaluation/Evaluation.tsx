import React, { ReactElement, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import css from './Evaluation.module.scss';
import EvaluationProcess from './EvaluationProcess';
import EvaluationResult from './EvaluationResult';
import EvaluationSideBar from './EvaluationSideBar';
import EvaluationSpec from './EvaluationSpec';
import UploadResponses from './UploadResponses';
import { useEvaluationState } from './EvaluationContext';
import { EvaluationSpecificationStoreService } from '../../Nexus/services/EvaluationSpecificationStoreService';

const Evaluation = (): ReactElement => {
  const { setSpecificationUpload, setTab, tab, specificationUpload } =
    useEvaluationState();

  useEffect(() => {
    if (!!specificationUpload.specification.bank.id) {
      setTab(1);
    }
  }, [specificationUpload, setTab]);

  const routeMatch = useRouteMatch<{ bankId: string }>('/evaluation/:bankId');

  useEffect(() => {
    const evaluationSpecificationStoreService =
      new EvaluationSpecificationStoreService();
    (async () => {
      evaluationSpecificationStoreService
        .getEvaluationSpecification(
          routeMatch?.params.bankId || 'could_not_find_id_in_route'
        )
        .then((result) => {
          setSpecificationUpload(result);
        });
    })();
  }, [routeMatch?.params.bankId, setSpecificationUpload]);

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
