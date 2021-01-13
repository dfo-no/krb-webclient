import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import styles from './KodelisteEditorSide.module.scss';
import { RootState } from '../store/configureStore';
import SideBar from '../SideBar/SideBar';
import { Kodeliste } from '../models/Kodeliste';
import { Kode } from '../models/Kode';

export default function KodelisteEditorSide(): ReactElement {
  const dispatch = useDispatch();
  const { kodelister, selectedKodeliste } = useSelector(
    (state: RootState) => state.kravbank
  );

  const createListOutput = (codelist: Kode[]) => {
    return codelist.map((element: Kode) => {
      return (
        <Link to="/about">
          <div className={styles.listitem} key={element.id}>
            <h4>{element.tittel}</h4>
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
          <h1>{kodelister[selectedKodeliste].tittel}</h1>
          <h3>{kodelister[selectedKodeliste].beskrivelse}</h3>

          <h2>Koder</h2>
          {createListOutput(kodelister[selectedKodeliste].koder)}
        </Col>
      </Row>
    </Container>
  );
}
