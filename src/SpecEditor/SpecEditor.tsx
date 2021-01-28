import React, { ReactElement } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { RootState } from '../store/configureStore';

export default function SpecEditor(): ReactElement {
  const { selectedBank } = useSelector((state: RootState) => state.kravbank);

  if (!selectedBank) {
    return <p>No selected bank</p>;
  }

  const kravlist = () => {};
  const behovList = () => {};

  return (
    <Container fluid>
      <Row className="m-4">
        <Col>
          <h2>{selectedBank.title}</h2>
        </Col>
        <Col>
          <Button>Download</Button>
        </Col>
      </Row>
      <Row className="m-4">
        <Col>
          <p>{selectedBank.description}</p>
        </Col>
      </Row>
    </Container>
  );
}
