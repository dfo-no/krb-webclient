import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { IResponse } from '../models/IResponse';
import { IEvaluatedResponse } from '../Nexus/entities/IEvaluatedResponse';
import Nexus from '../Nexus/Nexus';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setEvaluations } from '../store/reducers/evaluation-reducer';

interface IProps {
  responses: IResponse[];
}

export default function EvaluationList({
  responses
}: IProps): React.ReactElement {
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

  const renderEvaluations = () => {
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
