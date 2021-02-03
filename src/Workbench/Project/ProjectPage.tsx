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

import { RootState } from '../../store/rootReducer';
import { Publication } from '../../models/Publication';
import {
  publishProject,
  editProject,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { postBank } from '../../store/reducers/bank-reducer';
import { Utils } from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { useForm } from 'react-hook-form';

type FormValues = {
  title: string;
  description: string;
};

export default function ProjectPage(): ReactElement {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const [showEditor, setShowEditor] = useState(false);
  const [comment, setComment] = useState('');
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, errors } = useForm<Bank>();
  const [validated] = useState(false);

  if (!id) {
    return <p>Please select a project</p>;
  }

  let project = Utils.ensure(list.find((project: Bank) => project.id === id));

  const handlePublishProject = () => () => {
    let versionNumber = project.publications
      ? project.publications[project.publications.length - 1].version + 1
      : 1;
    let convertedDate = dayjs(new Date()).toJSON();
    let publishedProject = { ...project };
    publishedProject.publishedDate = convertedDate;
    dispatch(postBank(publishedProject));

    const publication: Publication = {
      date: convertedDate,
      comment: comment,
      version: versionNumber,
      id: Utils.getRandomNumber()
    };
    setShowEditor(false);
    dispatch(publishProject({ id: project.id, publication: publication }));
    dispatch(putProjectThunk(project));
  };

  const editProjectInfo = (post: FormValues) => {
    let newproject = {
      id: project.id,
      title: post.title,
      description: post.description,
      needs: project.needs,
      products: project.products,
      codelist: project.codelist,
      version: project.version,
      publications: project.publications
    };
    setEditMode(false);
    dispatch(editProject(newproject));
    dispatch(putProjectThunk(newproject));
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
              autoComplete="on"
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
                  ></Form.Control>
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
                  ></Form.Control>
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
    } else {
      return (
        <div className="mt-3 mb-5">
          <h1>{project.title}</h1>
          <h5>{project.description}</h5>
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        </div>
      );
    }
  }
  const publicationList = (publications?: Publication[]) => {
    if (publications) {
      const publication = publications.map((element: Publication) => {
        // TODO- Check locale for locale dateformat.
        const date = dayjs(element.date).format('DD/MM/YYYY');
        return (
          <ListGroup.Item key={element.id}>
            <p>{date + '     ' + element.comment}</p>
          </ListGroup.Item>
        );
      });
      return <ListGroup className="mt-3">{publication}</ListGroup>;
    }
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
    } else {
      return <></>;
    }
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
