import React, { ReactElement, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { getBanksThunk } from '../store/reducers/bank-reducer';
import { RootState } from '../store/store';
import FilteredList from './Components/FilteredList';

export default function HomePage(): ReactElement {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { list, status } = useSelector((state: RootState) => state.bank);

  useEffect(() => {
    async function fetchEverything() {
      if (status === 'idle') {
        dispatch(getBanksThunk());
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
              <Link to="/speceditor">
                <h5>{t('create specification')}</h5>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <FilteredList
            list={list}
            filterTitle={t('newest banks')}
            filterType="date"
          />
        </Col>
        <Col>
          <FilteredList
            list={list}
            filterTitle={t('popular banks')}
            filterType="alphabetic"
          />
        </Col>
      </Row>
    </Container>
  );
}
