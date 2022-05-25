import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import React, { ReactElement } from 'react';
import Row from 'react-bootstrap/Row';

import Nexus from '../../Nexus/Nexus';
import { IEvaluatedResponse } from '../../Nexus/entities/IEvaluatedResponse';
import { IResponse } from '../../models/IResponse';
import { setEvaluations } from '../../store/reducers/evaluation-reducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface IProps {
  responses: IResponse[];
}

export default function EvaluationList({ responses }: IProps): ReactElement {
  const { evaluations } = useAppSelector((state) => state.evaluation);
  const nexus = Nexus.getInstance();
  const dispatch = useAppDispatch();

  async function evaluateAll() {
    const evaluated = await nexus.evaluationService.evaluateAll(responses);
    return evaluated;
  }

  async function evaluate() {
    const evaluated = await evaluateAll().then((result) => {
      return result;
    });
    dispatch(setEvaluations(evaluated));
  }

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
      <Row>
        <Col>
          <Button onClick={() => evaluate()}>Evaluate Responses</Button>
        </Col>
      </Row>
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
    </>
  );
}
