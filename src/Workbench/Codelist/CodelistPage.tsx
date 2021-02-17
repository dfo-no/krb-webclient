import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import styles from './CodelistPage.module.scss';
import { RootState } from '../../store/store';
import { Codelist } from '../../models/Codelist';
import {
  addCodelist,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { selectCodeList } from '../../store/reducers/selectedCodelist-reducer';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';

type FormValues = {
  title: string;
  description: string;
};

export default function CodelistPage(): ReactElement {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.project);
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const [showEditor, setShowEdior] = useState(false);
  const { register, handleSubmit, errors } = useForm<Codelist>();
  const [validated] = useState(false);
  if (!id) {
    return <p>Please select a project</p>;
  }
  const selectedProject = Utils.ensure(
    list.find((bank: Bank) => bank.id === id)
  );

  const setSelectedKodeliste = (selectedCodelistId: string) => () => {
    dispatch(selectCodeList(selectedCodelistId));
  };

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

  const handleShowEditor = () => {
    setShowEdior(true);
  };

  const addNewCodelist = (post: FormValues) => {
    const codelist: Codelist = {
      title: post.title,
      description: post.description,
      id: uuidv4(),
      codes: [],
      type: 'codelist'
    };
    dispatch(addCodelist({ id, codelist }));
    dispatch(putProjectThunk(id));
    setShowEdior(false);
  };

  function renderCodelistEditor(show: boolean) {
    if (show) {
      return (
        <Card className="mt-3">
          <Card.Body>
            <Form
              onSubmit={handleSubmit(addNewCodelist)}
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
          </Card.Body>
        </Card>
      );
    }
    return <></>;
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
