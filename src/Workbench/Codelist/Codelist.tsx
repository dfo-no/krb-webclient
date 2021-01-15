import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormControl, InputGroup, ListGroup } from 'react-bootstrap';

import styles from './Codelist.module.scss';
import { RootState } from '../../store/configureStore';
import { Codelist } from '../../models/Codelist';
import {
  addCodelist,
  selectCodelist
} from '../../store/reducers/kravbank-reducer';

export default function CodelistPage(): ReactElement {
  const dispatch = useDispatch();
  const { codelists } = useSelector((state: RootState) => state.kravbank);
  const [codelist, setCodelist] = useState(codelists);
  const [showEditor, setShowEdior] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const renderCodelist = (codelist: Codelist[]) => {
    codelist.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
    );
    const jsx = codelist.map((element: Codelist) => {
      return (
        <ListGroup.Item key={element.id}>
          <Link
            onClick={setSelectedKodeliste(element.id)}
            to={`/workbench/codelist/${element.id}`}
          >
            <h5>{element.title}</h5>
            <p>{element.description}</p>
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
    const newCodelist: Codelist[] = [...codelist];
    let codeList = {
      title: title,
      description: description,
      id: Math.random(),
      codes: []
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
