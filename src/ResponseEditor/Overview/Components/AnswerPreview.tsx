import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

interface IProps {
  displayText: string;
  displayValue: string;
}

export default function AnswerPreview({
  displayText,
  displayValue
}: IProps): ReactElement {
  return (
    <Container className="m-3 w-50" fluid>
      <Row>
        <h6>{displayText}</h6>
      </Row>
      <Row>Ditt svar: </Row>
      <Row>
        <p>{displayValue}</p>
      </Row>
    </Container>
  );
}
