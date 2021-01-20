import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/configureStore';
import { Bank } from '../models/Bank';
import styles from './WorkbenchPage.module.scss';
import {
  addProject,
  selectProject,
  addBanks
} from '../store/reducers/kravbank-reducer';
import { fetchAllBanks } from '../api/bankApi';

export default function WorkbenchPage(): ReactElement {
  const dispatch = useDispatch();
  const { projects } = useSelector((state: RootState) => state.kravbank);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showEditor, setShowEdior] = useState(false);

  useEffect(() => {
    async function fetchEverything() {
      const banks = await fetchAllBanks();
      dispatch(addBanks(banks));
    }
    fetchEverything();
  });

  const handleShowEditor = () => {
    setShowEdior(true);
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const addNewProject = () => {
    let project = {
      id: Math.random(),
      title: title,
      description: description,
      needs: [],
      krav: [],
      codelist: []
    };
    dispatch(addProject(project));
    setShowEdior(false);
  };

  const handleSelectedProject = (id: number) => () => {
    dispatch(selectProject(id));
  };

  const renderProjects = (projectList: Bank[]) => {
    projectList
      .slice()
      .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    const jsx = projectList.map((element: Bank) => {
      return (
        <ListGroup.Item key={element.id}>
          <Link
            to={`/workbench/${element.id}`}
            onClick={handleSelectedProject(element.id)}
          >
            <h5>{element.title}</h5>
            <p>{element.description}</p>
          </Link>
        </ListGroup.Item>
      );
    });
    return <ListGroup className={styles.projectList}>{jsx}</ListGroup>;
  };
  function projectEditor(show: boolean) {
    if (show) {
      return (
        <div className={styles.project}>
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
              className={`primary ${styles.project__addButton}`}
              onClick={addNewProject}
            >
              Add
            </Button>
          </ListGroup.Item>
        </div>
      );
    } else {
      return <></>;
    }
  }

  return (
    <>
      <h3>Projects</h3>
      <Button onClick={handleShowEditor}>New Project</Button>
      {projectEditor(showEditor)}
      {renderProjects(projects)}
    </>
  );
}
