import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  FormControl,
  InputGroup,
  ListGroup
} from 'react-bootstrap';

import styles from './CodelistPage.module.scss';
import { RootState } from '../../store/rootReducer';
import { Codelist } from '../../models/Codelist';
import {
  addCodeList,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { selectCodeList } from '../../store/reducers/selectedCodelist-reducer';
import { Utils } from '../../common/Utils';
import { Bank } from '../../models/Bank';

interface RouteParams {
  projectId: string;
}

export default function CodelistPage(): ReactElement {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.project);
  const { id } = useSelector((state: RootState) => state.selectedProject);
  let { projectId } = useParams<RouteParams>();
  const [showEditor, setShowEdior] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!id) {
    return <p>Please select a project</p>;
  }
  const selectedProject = Utils.ensure(
    list.find((bank: Bank) => bank.id === id)
  );

  const renderCodelist = (codelist: Codelist[]) => {
    codelist
      .slice()
      .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    const codes = codelist.map((element: Codelist) => {
      return (
        <ListGroup.Item key={element.id}>
          <Link
            onClick={setSelectedKodeliste(element.id)}
            to={`/workbench/${selectedProject.id}/codelist/${element.id}`}
          >
            <h5>{element.title}</h5>
            <p>{element.description}</p>
          </Link>
        </ListGroup.Item>
      );
    });
    return <ListGroup className={styles.codeList}>{codes}</ListGroup>;
  };

  const setSelectedKodeliste = (id: number) => () => {
    dispatch(selectCodeList(id));
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
    let codeList: Codelist = {
      title: title,
      description: description,
      id: Utils.getRandomNumber(),
      codes: []
    };
    const projectIdNumber = +projectId;
    setShowEdior(false);
    dispatch(addCodeList({ id: projectIdNumber, codelist: codeList }));
    dispatch(putProjectThunk(selectedProject));
  };

  function renderCodelistEditor(show: boolean) {
    if (show) {
      return (
        <Card className="mt-3">
          <Card.Body>
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
            <Button className={styles.addButton} onClick={addNewCodelist}>
              Create
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
      <h1>Codelists</h1>
      <Button onClick={handleShowEditor}>New</Button>
      {renderCodelistEditor(showEditor)}
      {renderCodelist(selectedProject.codelist)}
    </>
  );
}
