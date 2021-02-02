import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  Button,
  Card,
  FormControl,
  InputGroup
} from 'react-bootstrap';

import styles from './CodeListEditor.module.scss';
import { RootState } from '../../store/rootReducer';
import { Code } from '../../models/Code';
import {
  addCode,
  editCode,
  editCodelist,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { Utils } from '../../common/Utils';
import { useParams } from 'react-router-dom';
import { Codelist } from '../../models/Codelist';
import { Bank } from '../../models/Bank';

interface RouteParams {
  projectId: string;
}

export default function CodeListEditor(): ReactElement {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.project);
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { listId } = useSelector((state: RootState) => state.selectedCodeList);
  let { projectId } = useParams<RouteParams>();
  //const [codes, setCodes] = useState(codelist ? codelist.codes : []);
  const [showEditor, setShowEdior] = useState(false);
  const [editmode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!id) {
    return <p>Please select a project</p>;
  }
  if (!listId) {
    return <p>Please select a codelist</p>;
  }

  const selectedProject = Utils.ensure(
    list.find((bank: Bank) => bank.id === id)
  );
  const selectedCodeList = Utils.ensure(
    selectedProject.codelist.find(
      (codelist: Codelist) => codelist.id === listId
    )
  );

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
    //let newCodeList: Code[] = [...codes];
    let code = {
      title: title,
      description: description,
      id: Utils.getRandomNumber()
    };
    //newCodeList.push(Kode);
    //setCodes(newCodeList);
    const projectIdNumber = +projectId;
    setShowEdior(false);
    dispatch(
      addCode({
        id: projectIdNumber,
        code: code,
        codeListId: selectedCodeList.id
      })
    );
    dispatch(putProjectThunk(selectedProject));
  };

  const editCodeElement = (id: number, index: number) => () => {
    let code = {
      id: id,
      title: title,
      description: description
    };
    const projectIdNumber = +projectId;
    //let newCodeList: Code[] = [...codes];
    //newCodeList[index] = code;
    //setCodes(newCodeList);
    dispatch(
      editCode({
        id: projectIdNumber,
        code: code,
        codeListId: selectedCodeList.id
      })
    );
    dispatch(putProjectThunk(selectedProject));
  };

  const editCodeList = () => {
    let newCodelist: Codelist = {
      id: selectedCodeList.id,
      title: title,
      description: description,
      codes: selectedCodeList.codes
    };
    const projectIdNumber = +projectId;
    dispatch(
      editCodelist({
        id: projectIdNumber,
        codeList: newCodelist,
        codeListId: selectedCodeList.id
      })
    );
    setEditMode(false);
    dispatch(putProjectThunk(selectedProject));
  };

  function renderHeaderSection(editmode: boolean) {
    if (editmode) {
      return (
        /*TODO: finne ut hvor sannsynlig det er at bruker skriver
         mange steder på samme tid, og derfor om handleTitleChange,
         og descriptionchange må skrives om de tre separate funksjoner */
        <Card className="mt-3">
          <Card.Body>
            <label htmlFor="title">Title</label>
            <InputGroup className="mb-3 30vw">
              <FormControl
                name="title"
                onChange={handleTitleChange}
                defaultValue={selectedCodeList.title}
              />
            </InputGroup>
            <label htmlFor="description">Description</label>
            <InputGroup>
              <FormControl
                name="description"
                onChange={handleDescriptionChange}
                defaultValue={selectedCodeList.description}
              />
            </InputGroup>
            <Button className="mt-2" onClick={editCodeList}>
              Save
            </Button>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <div className={styles.codelistSection}>
          <h1>{selectedCodeList.title}</h1>
          <h5>{selectedCodeList.description}</h5>
          <Button onClick={handleEditCodelist}>Edit</Button>
        </div>
      );
    }
  }

  const codeList = (codelist: Code[]) => {
    const codes = codelist.map((element: Code, index) => {
      return (
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
            <h6>{element.title}</h6>
            <p>{element.description}</p>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={index.toString()}>
            <Card.Body>
              <>
                <label htmlFor="title">Title</label>
                <InputGroup className="mb-3 30vw">
                  <FormControl
                    name="title"
                    defaultValue={element.title}
                    onChange={handleTitleChange}
                  />
                </InputGroup>
                <label htmlFor="title">Requirement text</label>
                <InputGroup className="mb-3 30vw">
                  <FormControl
                    name="description"
                    defaultValue={element.description}
                    onChange={handleDescriptionChange}
                  />
                </InputGroup>
                <Button onClick={editCodeElement(element.id, index)}>
                  Save
                </Button>
              </>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    });
    return <Accordion className={styles.codes}>{codes}</Accordion>;
  };

  function codeListEditor(show: boolean) {
    if (show) {
      return (
        <Card className="mt-3">
          <Card.Body>
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
            <Button className="mt-2" onClick={addNewCode}>
              Save
            </Button>
          </Card.Body>
        </Card>
      );
    } else {
      return <></>;
    }
  }

  return (
    <>
      {renderHeaderSection(editmode)}
      <h4>Codes</h4>
      <Button onClick={handleShowEditor}>New Code</Button>
      {codeListEditor(showEditor)}
      {codeList(selectedCodeList.codes)}
    </>
  );
}
