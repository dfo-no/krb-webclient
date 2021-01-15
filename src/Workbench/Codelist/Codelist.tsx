import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormControl, InputGroup, ListGroup } from 'react-bootstrap';

import styles from './Codelist.module.scss';
import { RootState } from '../../store/configureStore';
import { Kodeliste } from '../../models/Kodeliste';
import {
  addCodelist,
  selectCodelist
} from '../../store/reducers/kravbank-reducer';

export default function Codelist(): ReactElement {
  const dispatch = useDispatch();
  const { codelists } = useSelector((state: RootState) => state.kravbank);
  const [codelist, setCodelist] = useState(codelists);
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
            to={`/workbench/codelist/${element.id}`}
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
    dispatch(selectCodelist(id));
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
    const newCodelist: Kodeliste[] = [...codelist];
    let codeList = {
      tittel: title,
      beskrivelse: description,
      id: Math.random(),
      koder: []
    };
    newCodelist.push(codeList);
    setCodelist(newCodelist);
    setShowEdior(false);
    dispatch(addCodelist(codeList));
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
      return <></>;
    }
  }

  return (
    <>
      <h1>Codelists</h1>
      <Button onClick={handleShowEditor}>New</Button>
      {renderCodelistEditor(showEditor)}
      {renderCodelist(codelist)}
    </>
  );
}
