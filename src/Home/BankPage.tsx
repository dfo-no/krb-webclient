import React, { ReactElement } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar';
import FilteredList from './Components/FilteredList';
import { RootState } from '../store/configureStore';

export default function BankPage(): ReactElement {
  const { banks } = useSelector((state: RootState) => state.kravbank);
  const { selectedBank } = useSelector((state: RootState) => state.kravbank);

  if (!selectedBank) {
    return <p>No selected bank</p>;
  }

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
