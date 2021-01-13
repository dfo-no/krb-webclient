import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';

import styles from './KodelisteKatalogSide.module.scss';
import { RootState } from '../store/configureStore';
import SideBar from '../SideBar/SideBar';
import { Kodeliste } from '../models/Kodeliste';
import { addKodeliste } from '../store/reducers/kravbank-reducer';

export default function KodelisteEditorSide(): ReactElement {
  const dispatch = useDispatch();
  const { kodelister } = useSelector((state: RootState) => state.kravbank);
  const [kodeliste, setKodeliste] = useState(kodelister);
  const [showEditor, setShowEdior] = useState(false);
  const [tittel, setTittel] = useState('');
  const [beskrivelse, setBeskrivelse] = useState('');

  const renderCodelist = (codelist: Kodeliste[]) => {
    codelist.sort((a, b) =>
      a.tittel.toLowerCase() > b.tittel.toLowerCase() ? 1 : -1
    );
    const jsx = codelist.map((element: Kodeliste) => {
      return (
        <ListGroup.Item key={element.id}>
          <Link to={`/kodeliste/edit/${element.id}`}>
            <div className={styles.listitem} key={element.id}>
              <h5>{element.tittel}</h5>
              <p>{element.beskrivelse}</p>
            </div>
          </Link>
        </ListGroup.Item>
      );
    });
    return <ListGroup className={styles.codeoutput}>{jsx}</ListGroup>;
  };

  const handleShowEditor = () => {
    setShowEdior(true);
  };

  const handleTittelChange = (event: any) => {
    setTittel(event.target.value);
  };
  const handleBeskrivelseChange = (event: any) => {
    setBeskrivelse(event.target.value);
  };

  const addNewKodelist = () => {
    const newKodeliste: Kodeliste[] = [...kodeliste];
    let Kodeliste = {
      tittel: tittel,
      beskrivelse: beskrivelse,
      id: Math.random()
    };
    newKodeliste.push(Kodeliste);
    setKodeliste(newKodeliste);
    setShowEdior(false);
    dispatch(addKodeliste(Kodeliste));
  };

  function renderCodelistEditor(show: boolean) {
    if (show) {
      return (
        <div className={styles.formdiv}>
          {' '}
          <label>
            Tittel
            <input name="tittel" onChange={handleTittelChange} />
          </label>
          <label>
            Beskrivelse
            <input name="beskrivelse" onChange={handleBeskrivelseChange} />
          </label>
          <Button className={styles.newbutton} onClick={addNewKodelist}>
            Opprett
          </Button>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col className="col-md-3 p-0 m-0">
          <SideBar />
        </Col>
        <Col className="col-md-15 p-5">
          <h1>Kodelister</h1>
          <Button onClick={handleShowEditor}>Ny kodeliste</Button>
          {renderCodelistEditor(showEditor)}
          {renderCodelist(kodeliste)}
        </Col>
      </Row>
    </Container>
  );
}
