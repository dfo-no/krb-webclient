/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  Button,
  Card,
  FormControl,
  InputGroup
} from 'react-bootstrap';

import styles from './CodeListEditor.module.scss';
import { RootState } from '../../store/store';
import { Code } from '../../models/Code';
import {
  addCodeToCodelist,
  editCodeInCodelist,
  editCodelist,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import Utils from '../../common/Utils';
import { Codelist } from '../../models/Codelist';
import { Bank } from '../../models/Bank';
import { AccordionContext } from '../Need/AccordionContext';

export default function CodeListEditor(): ReactElement {
  const dispatch = useDispatch();
  const { onOpenClose } = useContext(AccordionContext);
  const { list } = useSelector((state: RootState) => state.project);
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { listId } = useSelector((state: RootState) => state.selectedCodeList);
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

  const handleTitleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setDescription(event.target.value);
  };

  const handleEditCodelist = () => {
    setEditMode(true);
  };

  const addNewCode = () => {
    const code: Code = {
      title,
      description,
      id: '',
      type: 'code'
    };
    dispatch(addCodeToCodelist({ projectId: id, codelistId: listId, code }));
    dispatch(putProjectThunk(id));
    setShowEdior(false);
  };

  const editCodeElement = (codeId: string) => () => {
    const code: Code = {
      id: codeId, // TODO: suspicious about this one
      title,
      description,
      type: 'code'
    };

    dispatch(editCodeInCodelist({ projectId: id, codelistId: listId, code }));
    dispatch(putProjectThunk(id));
    onOpenClose('');
  };

  const onEditCodelist = () => {
    dispatch(
      editCodelist({
        projectId: id,
        codelistId: selectedCodeList.id,
        title,
        description
      })
    );
    dispatch(putProjectThunk(id));
    setEditMode(false);
  };

  function renderHeaderSection(edit: boolean) {
    if (edit) {
      return (
        /* TODO: finne ut hvor sannsynlig det er at bruker skriver
         mange steder på samme tid, og derfor om handleTitleChange,
         og descriptionchange må skrives om de tre separate funksjoner */
        <Card className="mt-3">
          <Card.Body>
            <label htmlFor="title">Title2</label>
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
            <FormControl
              name="codelistId"
              type="hidden"
              value={selectedCodeList.id}
            />
            <Button className="mt-2" onClick={onEditCodelist}>
              Save
            </Button>
          </Card.Body>
        </Card>
      );
    }
    return (
      <div className={styles.codelistSection}>
        <h1>{selectedCodeList.title}</h1>
        <h5>{selectedCodeList.description}</h5>
        <Button onClick={handleEditCodelist}>Edit</Button>
      </div>
    );
  }

  const codeList = (codelist: Code[]) => {
    const codes = codelist.map((element: Code, index) => {
      return (
        <Card key={element.id}>
          <Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
            <h6>{element.title}</h6>
            <p>{element.description}</p>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={index.toString()}>
            <Card.Body>
              <>
                <label htmlFor="title">Title3</label>
                <InputGroup className="mb-3 30vw">
                  <FormControl
                    name="title"
                    defaultValue={element.title}
                    onChange={(e) => handleTitleChange(e)}
                  />
                </InputGroup>
                <label htmlFor="title">Requirement text</label>
                <InputGroup className="mb-3 30vw">
                  <FormControl
                    name="description"
                    defaultValue={element.description}
                    onChange={(e) => handleDescriptionChange(e)}
                  />
                </InputGroup>
                <Button onClick={editCodeElement(element.id)}>Save</Button>
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
                onChange={(e) => handleTitleChange(e)}
              />
            </InputGroup>
            <label htmlFor="description">Description</label>
            <InputGroup>
              <FormControl
                name="description"
                onChange={(e) => handleDescriptionChange(e)}
              />
            </InputGroup>
            <Button className="mt-2" onClick={addNewCode}>
              Save
            </Button>
          </Card.Body>
        </Card>
      );
    }
    return <></>;
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
