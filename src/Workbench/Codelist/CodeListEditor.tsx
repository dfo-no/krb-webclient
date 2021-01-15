import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControl, InputGroup, ListGroup } from 'react-bootstrap';

import styles from './CodeListEditor.module.scss';
import { RootState } from '../../store/configureStore';
import { Code } from '../../models/Code';
import {
  addCode,
  editCode,
  editCodelist
} from '../../store/reducers/kravbank-reducer';

export default function CodeListEditor(): ReactElement {
  const dispatch = useDispatch();
  const { codelists, selectedCodelist } = useSelector(
    (state: RootState) => state.kravbank
  );

  const listIndex = codelists.findIndex(
    (codelist) => codelist.id === selectedCodelist
  );
  const codelist = codelists[listIndex];
  const [codes, setCodes] = useState(codelist ? codelist.codes : []);
  const [showEditor, setShowEdior] = useState(false);
  const [editmode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedItem, setSelectedItem] = useState(0);

  const handleCodeSelected = (id: number) => () => {
    setSelectedItem(id);
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

  const handleEditCodelist = () => {
    setEditMode(true);
  };

  const addNewCode = () => {
    let newCodeList: Code[] = [...codes];
    let Kode = {
      title: title,
      description: description,
      id: Math.random()
    };
    newCodeList.push(Kode);
    setCodes(newCodeList);
    setShowEdior(false);
    dispatch(addCode(Kode));
  };

  const editCodeElement = (id: number, index: number) => () => {
    let code = {
      id: id,
      title: title,
      description: description
    };
    let newCodeList: Code[] = [...codes];
    newCodeList[index] = code;
    setSelectedItem(0);
    setCodes(newCodeList);
    dispatch(editCode(code));
  };

  const editCodeList = () => {
    let newCodelist = {
      id: codelist.id,
      title: title,
      description: description,
      codes: codes
    };
    dispatch(editCodelist(newCodelist));
    setEditMode(false);
  };

  function renderHeaderSection(editmode: boolean) {
    if (editmode) {
      return (
        /*TODO: finne ut hvor sannsynlig det er at bruker skriver
         mange steder på samme tid, og derfor om handleTitleChange, 
         og descriptionchange må skrives om de tre separate funksjoner */
        <div className={styles.headersection}>
          <label htmlFor="title">Title</label>
          <InputGroup className="mb-3 30vw">
            <FormControl
              name="title"
              onChange={handleTitleChange}
              defaultValue={codelist.title}
            />
          </InputGroup>
          <label htmlFor="description">Description</label>
          <InputGroup>
            <FormControl
              name="description"
              onChange={handleDescriptionChange}
              defaultValue={codelist.description}
            />
          </InputGroup>
          <Button className={styles.newbutton} onClick={editCodeList}>
            Save
          </Button>
        </div>
      );
    } else {
      return (
        <div className={styles.headersection}>
          <h1>{codelist.title}</h1>
          <h5>{codelist.description}</h5>{' '}
          <Button className={styles.newbutton} onClick={handleEditCodelist}>
            Edit
          </Button>
        </div>
      );
    }
  }

  const renderKodeOutput = (codelist: Code[], selectedItem: number) => {
    let codeindex = codelist.findIndex((kode) => kode.id === selectedItem);
    const jsx = codelist.map((element: Code) => {
      if (element.id === selectedItem) {
        return (
          <ListGroup.Item key={element.id}>
            <label htmlFor="title">Title</label>
            <InputGroup className="mb-3 30vw">
              <FormControl
                name="title"
                defaultValue={codelist[codeindex].title}
                onChange={handleTitleChange}
              />
            </InputGroup>
            <label htmlFor="description">Description</label>
            <InputGroup>
              <FormControl
                name="beskrivelse"
                defaultValue={codelist[codeindex].description}
                onChange={handleDescriptionChange}
              />
            </InputGroup>
            <Button
              className={styles.newbutton}
              onClick={editCodeElement(element.id, codeindex)}
            >
              Save
            </Button>
          </ListGroup.Item>
        );
      } else {
        return (
          <ListGroup.Item
            key={element.id}
            onClick={handleCodeSelected(element.id)}
          >
            <h5>{element.title}</h5>
            <p>{element.description}</p>
          </ListGroup.Item>
        );
      }
    });
    return <ListGroup className={styles.codeoutput}>{jsx}</ListGroup>;
  };

  function renderCodeEditor(show: boolean) {
    if (show) {
      return (
        <div className={styles.formdiv}>
          <ListGroup.Item>
            <label htmlFor="title">Title</label>
            <InputGroup className="mb-3 30vw">
              <FormControl
                className="input-sm"
                name="title"
                onChange={handleTitleChange}
              />
            </InputGroup>
            <label htmlFor="description">Description</label>
            <InputGroup>
              <FormControl
                name="description"
                onChange={handleDescriptionChange}
              />
            </InputGroup>
            <Button
              className={`primary ${styles.newbutton}`}
              onClick={addNewCode}
            >
              Save
            </Button>
          </ListGroup.Item>
        </div>
      );
    } else {
      return <></>;
    }
  }

  return codelist ? (
    <>
      {renderHeaderSection(editmode)}
      <div>
        <h4>Codes</h4>
        <Button onClick={handleShowEditor}>New Code</Button>
        {renderCodeEditor(showEditor)}
        {renderKodeOutput(codes, selectedItem)}
      </div>
    </>
  ) : (
    <></>
  );
}
