import React, { ReactElement, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar';
import FilteredList from './Components/FilteredList';
import { getBanks } from '../store/reducers/bank-reducer';
import { RootState } from '../store/store';

export default function HomePage(): ReactElement {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state: RootState) => state.bank);

  useEffect(() => {
    async function fetchEverything() {
      if (status === 'idle') {
        dispatch(getBanks());
      }
    }
    fetchEverything();
  }, [status, dispatch]);

  return (
    <Container fluid>
      <Row className="mt-2">
        <Col>
          <SearchBar list={list} />
        </Col>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Link to="/workbench">
                <h5>Editor</h5>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/responseeditor">
                <h5>Create response</h5>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/evaluation">
                <h5>Create evaluation</h5>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <FilteredList
            list={list}
            filterTitle="Newest banks"
            filterType="date"
          />
        </Col>
        <Col>
          <FilteredList
            list={list}
            filterTitle="Popular banks"
            filterType="alphabetic"
          />
        </Col>
      </Row>
    </Container>
  );
}
