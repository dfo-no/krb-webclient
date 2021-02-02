import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEdit } from 'react-icons/ai';
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { Need } from '../../models/Need';
import styles from './NeedPage.module.scss';
import { RootState } from '../../store/rootReducer';
import { Utils } from '../../common/Utils';
import { putProjectThunk } from '../../store/reducers/project-reducer';

type FormValues = {
  tittel: string;
  beskrivelse: string;
};

function NeedPage(): ReactElement {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm<Need>();
  const [validated] = useState(false);
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);

  if (list.length === 0 || !id) {
    return <div>Loading NeedPage....</div>;
  }
  let project = Utils.ensure(list.find((banks) => banks.id === id));

  const onNewNeedSubmit = (post: FormValues, e: any) => {
    const need: Need = {
      id: Utils.getRandomNumber(),
      tittel: post.tittel,
      beskrivelse: post.beskrivelse,
      requirements: []
    };
    // TODO: Black magic here. Must be a better way
    let clonedProject = { ...project };
    clonedProject.needs = [...project.needs, need];
    dispatch(putProjectThunk(clonedProject));
  };

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

      {renderNeeds(project.needs)}
    </ListGroup>
  );
}

export default NeedPage;
