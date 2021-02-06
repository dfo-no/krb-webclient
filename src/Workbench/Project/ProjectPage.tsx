/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ListGroup,
  InputGroup,
  FormControl,
  Card,
  Form,
  Row,
  Col
} from 'react-bootstrap';
import dayjs from 'dayjs';

import { useForm } from 'react-hook-form';
import { RootState } from '../../store/store';
import { Publication } from '../../models/Publication';
import {
  editProject,
  putProjectThunk,
  addPublication,
  incrementProjectVersion
} from '../../store/reducers/project-reducer';
import { postBank } from '../../store/reducers/bank-reducer';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';

type FormValues = {
  title: string;
  description: string;
};

function ProjectPage(): ReactElement {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const [showEditor, setShowEditor] = useState(false);
  const [comment, setComment] = useState('');
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, errors } = useForm<Bank>();
  const [validated] = useState(false);

  if (!list) {
    return <p>Loading ....</p>;
  }

  const project = Utils.ensure(list.find((element) => element.id === id));

  const handlePublishProject = () => () => {
    const versionNumber = project.publications
      ? project.publications[project.publications.length - 1].version + 1
      : 1;

    const convertedDate = dayjs(new Date()).toJSON();
    const publishedProject = { ...project };
    publishedProject.publishedDate = convertedDate;
    publishedProject.id = Utils.getRandomNumber();
    dispatch(postBank(publishedProject));

    const publication: Publication = {
      date: convertedDate,
      comment,
      version: versionNumber,
      id: Utils.getRandomNumber()
    };
    setShowEditor(false);

    dispatch(addPublication({ projectId: project.id, publication }));
    dispatch(incrementProjectVersion(project.id));
    dispatch(putProjectThunk(project.id));
  };

  const editProjectInfo = (post: FormValues) => {
    dispatch(
      editProject({
        projectId: project.id,
        title: post.title,
        description: post.description
      })
    );
    dispatch(putProjectThunk(project.id));
    setEditMode(false);
  };

  const handleCommentChange = (event: any) => {
    setComment(event.target.value);
  };

  function headerSection(editmode: boolean) {
    if (editmode) {
      return (
        <Card className="mt-3">
          <Card.Body>
            <Form
              onSubmit={handleSubmit(editProjectInfo)}
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
                    defaultValue={project.title}
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
                    defaultValue={project.description}
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
          </Card.Body>
        </Card>
      );
    }
    return (
      <div className="mt-3 mb-5">
        <h1>{project.title}</h1>
        <h5>{project.description}</h5>
        <Button onClick={() => setEditMode(true)}>Edit</Button>
      </div>
    );
  }
  const publicationList = (publications?: Publication[]) => {
    if (publications) {
      const publication = publications.map((element: Publication) => {
        const date = dayjs(element.date).format('DD/MM/YYYY');
        return (
          <ListGroup.Item key={element.id}>
            <p>{`${date}     ${element.comment}`}</p>
          </ListGroup.Item>
        );
      });
      return <ListGroup className="mt-3">{publication}</ListGroup>;
    }
    return <></>;
  };

  const publicationEditor = (show: boolean) => {
    if (show) {
      return (
        <ListGroup className="mt-3">
          <ListGroup.Item>
            <label htmlFor="title">Comment</label>
            <InputGroup className="mb-3 30vw">
              <FormControl
                className="input-sm"
                name="title"
                placeholder="What did you change?"
                onChange={handleCommentChange}
              />
            </InputGroup>
            <Button onClick={handlePublishProject()}>Publish</Button>
          </ListGroup.Item>
        </ListGroup>
      );
    }
    return <></>;
  };

  return (
    <>
      {headerSection(editMode)}
      <h4>Publications</h4>
      <Button className="mb-3" onClick={() => setShowEditor(true)}>
        New publication
      </Button>
      {publicationEditor(showEditor)}
      {publicationList(project.publications)}
    </>
  );
}

export default ProjectPage;
