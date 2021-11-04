import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export default function BankPage(): React.ReactElement {
  const { id } = useAppSelector((state) => state.selectedBank);
  const { normalizedList } = useAppSelector((state) => state.bank);

  if (!id) {
    return <p>No selected bank</p>;
  }

  const selectedBank = normalizedList[id];
  return (
    <Container fluid>
      <Row>
        <h1>{selectedBank.title}</h1>
      </Row>
      <Row>
        <Link to={`/specification/${selectedBank.id}`}>
          <Button>Create spec</Button>
        </Link>
      </Row>
    </Container>
  );
}
