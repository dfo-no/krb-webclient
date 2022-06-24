import React, { ReactElement } from 'react';

import { IEvaluatedResponse } from '../../Nexus/entities/IEvaluatedResponse';
import { useAppSelector } from '../../store/hooks';
import DownLoad from './DownLoad';

export default function EvaluationList(): ReactElement {
  const { evaluations } = useAppSelector((state) => state.evaluation);

  const renderEvaluations = (): ReactElement[] => {
    return evaluations.map((response: IEvaluatedResponse) => {
      return (
        <div key={response.supplier}>
          <div>
            <p> {response.supplier} </p>
          </div>
          <div>
            <p>{response.points}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {evaluations.length > 0 && (
        <div className="bg-light">
          <div>
            <div>
              <div>
                <h6>Responders name </h6>
                <hr />
              </div>
              <div>
                <h6>Calculated score : </h6>
                <hr />
              </div>
            </div>
            {renderEvaluations()}
          </div>
        </div>
      )}
      <DownLoad />
    </>
  );
}
