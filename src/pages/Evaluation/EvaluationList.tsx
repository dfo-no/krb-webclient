import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import React, { ReactElement } from 'react';
import Row from 'react-bootstrap/Row';

import { IEvaluatedResponse } from '../../Nexus/entities/IEvaluatedResponse';
import { useAppSelector } from '../../store/hooks';
import DownLoad from './DownLoad';

export default function EvaluationList(): ReactElement {
  const { evaluations } = useAppSelector((state) => state.evaluation);

  const renderEvaluations = (): ReactElement[] => {
    return evaluations.map((response: IEvaluatedResponse) => {
      return (
        <Row key={response.supplier}>
          <Col>
            <p> {response.supplier} </p>
          </Col>
          <Col>
            <p>{response.points}</p>
          </Col>
        </Row>
      );
    });
  };

  return (
    <>
      {evaluations.length > 0 && (
        <Card className="bg-light">
          <Card.Body>
            <Row>
              <Col>
                <h6>Responders name </h6>
                <hr />
              </Col>
              <Col>
                <h6>Calculated score : </h6>
                <hr />
              </Col>
            </Row>
            {renderEvaluations()}
          </Card.Body>
        </Card>
      )}
      <DownLoad />
    </>
  );
}
