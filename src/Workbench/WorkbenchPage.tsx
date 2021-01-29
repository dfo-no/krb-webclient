import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/rootReducer';
import { Bank } from '../models/Bank';
import { addProject, selectProject } from '../store/reducers/kravbank-reducer';
import { getBanks } from '../store/reducers/bank-reducer';

export default function WorkbenchPage(): ReactElement {
  const dispatch = useDispatch();
  const { projects } = useSelector((state: RootState) => state.kravbank);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showEditor, setShowEdior] = useState(false);

  useEffect(() => {
    async function fetchEverything() {
      await getBanks();
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
      codelist: [],
      version: 1
    };
    dispatch(addProject(project));
    setShowEdior(false);
  };

  const handleSelectedProject = (bank: Bank) => () => {
    dispatch(selectProject(bank));
  };

  const renderProjects = (projectList: Bank[]) => {
    projectList
      .slice()
      .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    const projects = projectList.map((element: Bank) => {
      return (
        <ListGroup.Item key={element.id}>
          <Link
            to={`/workbench/${element.id}`}
            onClick={handleSelectedProject(element)}
          >
            <h5>{element.title}</h5>
            <p>{element.description}</p>
          </Link>
        </ListGroup.Item>
      );
    });
    return <ListGroup className="mt-5">{projects}</ListGroup>;
  };
  function projectEditor(show: boolean) {
    if (show) {
      return (
        <ListGroup className="mt-3">
          <ListGroup.Item>
            <label htmlFor="title">Title</label>
            <InputGroup>
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
            <Button className="mt-2" onClick={addNewProject}>
              Add
            </Button>
          </ListGroup.Item>
        </ListGroup>
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
