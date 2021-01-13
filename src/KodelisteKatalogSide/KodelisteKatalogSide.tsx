import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import styles from './KodelisteKatalogSide.module.scss';
import { RootState } from '../store/configureStore';
import SideBar from '../SideBar/SideBar';
import { Kodeliste } from '../models/Kodeliste';

export default function KodelisteEditorSide(): ReactElement {
  const dispatch = useDispatch();
  const { kodelister } = useSelector((state: RootState) => state.kravbank);

  const createListOutput = (codelist: Kodeliste[]) => {
    return codelist.map((element: Kodeliste) => {
      return (
        <Link to="/about">
          <div className={styles.listitem} key={element.id}>
            <p>{element.tittel}</p>
            <p>{element.beskrivelse}</p>
          </div>
        </Link>
      );
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col className="col-md-3 p-0 m-0">
          <SideBar />
        </Col>
        <Col className="col-md-15 p-5">
          <h1>Kodelister</h1>
          {createListOutput(kodelister)}
        </Col>
      </Row>
    </Container>
  );
}
