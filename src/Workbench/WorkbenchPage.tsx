import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import css from './WorkbenchPage.module.scss';
import { RootState } from '../store/store';
import { Bank } from '../models/Bank';
import {
  deleteProjectThunk,
  getProjectsThunk,
  postProjectThunk
} from '../store/reducers/project-reducer';
import { selectProject } from '../store/reducers/selectedProject-reducer';

type FormValues = {
  title: string;
  description: string;
};

function WorkbenchPage(): ReactElement {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.project);
  const history = useHistory();
  const [showEditor, setShowEditor] = useState(false);

  const { register, handleSubmit, reset, errors } = useForm<FormValues>();
  const [validated] = useState(false);

  const handleShowEditor = () => {
    setShowEditor(true);
  };

  const onSubmit = (post: FormValues) => {
    const project: Bank = {
      id: '',
      title: post.title,
      description: post.description,
      needs: [],
      products: [],
      codelist: [],
      version: 1
    };
    dispatch(postProjectThunk(project));
    reset();
    setShowEditor(false);
  };

  function onSelect(project: Bank) {
    dispatch(selectProject(project.id));
    history.push(`/workbench/${project.id}`);
  }

  function onDelete(project: Bank) {
    dispatch(deleteProjectThunk(project));
    dispatch(getProjectsThunk()); // TODO: Should not be neccessary
  }

  const renderProjects = (projectList: Bank[]) => {
    projectList
      .slice()
      .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    const projects = projectList.map((element: Bank) => {
      return (
        <ListGroup.Item key={element.id} className={`${css.list__item}`}>
          {/* TODO: fix styling  */}
          <Button onClick={() => onSelect(element)}>
            <h5>{element.title}</h5>
            <p>{element.description}</p>
          </Button>
          <div className={css.list__item__spacer} />
          <Button variant="warning" onClick={() => onDelete(element)}>
            <AiFillDelete />
            <div>(Dev)</div>
          </Button>
        </ListGroup.Item>
      );
    });
    return <ListGroup className={`${css.list} mt-5`}>{projects}</ListGroup>;
  };

  function projectEditor(show: boolean) {
    if (show) {
      return (
        <ListGroup className="mt-3">
          <ListGroup.Item>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              noValidate
              validated={validated}
            >
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Title
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="title"
                    ref={register({
                      required: { value: true, message: 'Required' },
                      minLength: { value: 2, message: 'Minimum 2 characters' }
                    })}
                    isInvalid={!!errors.title}
                  />
                  {errors.title && (
                    <Form.Control.Feedback type="invalid">
                      {errors.title.message}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Description
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="description"
                    ref={register({
                      required: { value: true, message: 'Required' },
                      minLength: { value: 2, message: 'Minimum 2 characters' }
                    })}
                    isInvalid={!!errors.description}
                  />
                  {errors.description && (
                    <Form.Control.Feedback type="invalid">
                      {errors.description.message}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Form.Group>
              <Button className="mt-2" type="submit">
                Save
              </Button>
            </Form>
          </ListGroup.Item>
        </ListGroup>
      );
    }
    return <></>;
  }

  return (
    <>
      <h3>Projects </h3>
      <Button onClick={handleShowEditor}>New Project</Button>
      {projectEditor(showEditor)}
      {renderProjects(list)}
    </>
  );
}

export default WorkbenchPage;
