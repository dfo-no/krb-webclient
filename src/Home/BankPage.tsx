import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Utils from '../common/Utils';
import { Bank } from '../models/Bank';
import { useAppSelector } from '../store/hooks';

export default function BankPage(): ReactElement {
  const { id } = useAppSelector((state) => state.selectedBank);
  const { list } = useAppSelector((state) => state.bank);

  if (!id) {
    return <p>No selected bank</p>;
  }

  const selectedBank = Utils.ensure(list.find((bank: Bank) => bank.id === id));
  return (
    <Container fluid>
      <Row>
        <h1>{selectedBank.title}</h1>
      </Row>
      <Row>
        <Link to={`/speceditor/${selectedBank.id}`}>
          <Button>Create spec</Button>
        </Link>
      </Row>
    </Container>
  );
}
