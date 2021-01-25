import React, { ReactElement } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar';
import FilteredList from './Components/FilteredList';
import { RootState } from '../store/configureStore';

export default function HomePage(): ReactElement {
  const { banks } = useSelector((state: RootState) => state.kravbank);

  return (
    <Container fluid>
      <Row className="mt-2">
        <Col>
          <SearchBar list={banks} />
        </Col>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Link to={'/workbench'}>
                <h5>Editor</h5>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to={'/workbench'}>
                <h5>Create response</h5>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to={'/workbench'}>
                <h5>Create evaluation</h5>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <FilteredList
            list={banks}
            filterTitle={'Newest banks'}
            filterType={'date'}
          />
        </Col>
        <Col>
          <FilteredList
            list={banks}
            filterTitle={'Popular banks'}
            filterType={'alphabetic'}
          />
        </Col>
      </Row>
    </Container>
  );
}
