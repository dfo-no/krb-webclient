import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  ListGroup,
  Row
} from 'react-bootstrap';

import styles from './KodelisteKatalogSide.module.scss';
import { RootState } from '../store/configureStore';
import SideBar from '../SideBar/SideBar';
import { Kodeliste } from '../models/Kodeliste';
import {
  addKodeliste,
  selectKodeliste
} from '../store/reducers/kravbank-reducer';

export default function KodelisteEditorSide(): ReactElement {
  const dispatch = useDispatch();
  const { kodelister } = useSelector((state: RootState) => state.kravbank);
  const [kodeliste, setKodeliste] = useState(kodelister);
  const [showEditor, setShowEdior] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const renderCodelist = (codelist: Kodeliste[]) => {
    codelist.sort((a, b) =>
      a.tittel.toLowerCase() > b.tittel.toLowerCase() ? 1 : -1
    );
    const jsx = codelist.map((element: Kodeliste) => {
      return (
        <ListGroup.Item key={element.id}>
          <Link
            onClick={setSelectedKodeliste(element.id)}
            to={`/kodeliste/edit/${element.id}`}
          >
            <h5>{element.tittel}</h5>
            <p>{element.beskrivelse}</p>
          </Link>
        </ListGroup.Item>
      );
    });
    return <ListGroup className={styles.codeoutput}>{jsx}</ListGroup>;
  };

  const setSelectedKodeliste = (id: number) => () => {
    dispatch(selectKodeliste(id));
  };
  const handleShowEditor = () => {
    setShowEdior(true);
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const addNewCodelist = () => {
    const newKodeliste: Kodeliste[] = [...kodeliste];
    let Kodeliste = {
      tittel: title,
      beskrivelse: description,
      id: Math.random(),
      koder: []
    };
    newKodeliste.push(Kodeliste);
    setKodeliste(newKodeliste);
    setShowEdior(false);
    dispatch(addKodeliste(Kodeliste));
  };

  function renderCodelistEditor(show: boolean) {
    if (show) {
      return (
        <div className={styles.codeinput}>
          <label htmlFor="title">Title</label>
          <InputGroup className="mb-3 30vw">
            <FormControl name="title" onChange={handleTitleChange} />
          </InputGroup>
          <label htmlFor="description">Description</label>
          <InputGroup>
            <FormControl
              name="description"
              onChange={handleDescriptionChange}
            />
          </InputGroup>
          <Button className={styles.newbutton} onClick={addNewCodelist}>
            Create
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
          <h1>Codelists</h1>
          <Button onClick={handleShowEditor}>New </Button>
          {renderCodelistEditor(showEditor)}
          {renderCodelist(kodeliste)}
        </Col>
      </Row>
    </Container>
  );
}
