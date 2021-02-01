import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { Need } from '../../models/Need';
import styles from './NeedPage.module.scss';
import { RootState } from '../../store/rootReducer';
import { Utils } from '../../common/Utils';
import { addNeed, putProjectThunk } from '../../store/reducers/project-reducer';
import { selectProject } from '../../store/reducers/selectedProject-reducer';

type FormValues = {
  tittel: string;
  beskrivelse: string;
};

interface RouteParams {
  projectId: string;
}

function NeedPage(): ReactElement {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.selectedProject);
  let { projectId } = useParams<RouteParams>();
  const { list } = useSelector((state: RootState) => state.project);

  // we arrived at this page directly by url, not by seleting a project!
  // TODO: fetch the selected project using the url parameter
  /*if (!id) {
    dispatch(selectProject(+projectId));
  }*/

  const selectedProject = Utils.ensure(list.find((banks) => banks.id === id));

  const { register, handleSubmit, errors } = useForm<Need>();
  const [validated] = useState(false);

  const onNewNeedSubmit = (post: FormValues, e: any) => {
    let need: Need = {
      id: Utils.getRandomNumber(),
      tittel: post.tittel,
      beskrivelse: post.beskrivelse,
      requirements: []
    };
    const projectIdNumber = +projectId;
    dispatch(addNeed({ id: projectIdNumber, need }));
    dispatch(putProjectThunk(selectedProject));
  };

  if (!id) {
    return <p>No Project selected</p>;
  }

  const renderNeeds = (list: any) => {
    return list.map((element: Need) => {
      return (
        <ListGroup.Item key={element.id} className={styles.need}>
          <div className={styles.need__title}>{element.tittel}</div>
          <div className={styles.need__spacer}></div>
          <Button variant="info" className={styles.need__editButton}>
            <AiFillEdit></AiFillEdit>
          </Button>
        </ListGroup.Item>
      );
    });
  };

  return (
    <ListGroup className={styles.needs}>
      <ListGroup.Item>
        <Form
          onSubmit={handleSubmit(onNewNeedSubmit)}
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
                name="tittel"
                ref={register({
                  required: { value: true, message: 'Required' },
                  minLength: { value: 2, message: 'Minimum 2 characters' }
                })}
                isInvalid={!!errors.tittel}
              ></Form.Control>
              {errors.tittel && (
                <Form.Control.Feedback type="invalid">
                  {errors.tittel.message}
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
                name="beskrivelse"
                ref={register({
                  required: { value: true, message: 'Required' },
                  minLength: { value: 2, message: 'Minimum 2 characters' }
                })}
                isInvalid={!!errors.beskrivelse}
              ></Form.Control>
              {errors.beskrivelse && (
                <Form.Control.Feedback type="invalid">
                  {errors.beskrivelse.message}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>
          <Button className="mt-2" type="submit">
            Save
          </Button>
        </Form>
      </ListGroup.Item>

      {renderNeeds(selectedProject.needs)}
    </ListGroup>
  );
}

export default NeedPage;
