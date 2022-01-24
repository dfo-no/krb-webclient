import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

import FilteredList from './Components/FilteredList';

export default function HomePage(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Container fluid>
      <Row className="mt-2">
        <Col></Col>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item className="mt-1 ">
              <Link to="/workbench">
                <h5>{t('create projects')}</h5>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item className="mt-1 ">
              <Link to="/response">
                <h5>{t('create response')}</h5>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item className="mt-1 ">
              <Link to="/evaluation">
                <h5>{t('create evaluation')}</h5>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item className="mt-1 ">
              <Link to="/specification">
                <h5>{t('create specification')}</h5>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
