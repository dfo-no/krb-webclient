import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import Joi from 'joi';

import { v4 as uuidv4 } from 'uuid';
import {
  addCodelist,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { RootState } from '../../store/store';
import { Codelist } from '../../models/Codelist';
import MODELTYPE from '../../models/ModelType';

type FormValues = {
  title: string;
  description: string;
};
interface IProps {
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
  toggleAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const codeListSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required()
});

function NewCodeListForm({ toggleShow, toggleAlert }: IProps): ReactElement {
  const dispatch = useDispatch();
  const [validated] = useState(false);

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: joiResolver(codeListSchema)
  });

  const { id } = useSelector((state: RootState) => state.selectedProject);

  if (!id) {
    return <div>Loading Productform</div>;
  }

  const onNewCodeSubmit = (post: FormValues) => {
    const codeList: Codelist = {
      id: uuidv4(),
      title: post.title,
      description: post.description,
      codes: [],
      type: MODELTYPE.codelist
    };
    dispatch(addCodelist({ id, codelist: codeList }));
    dispatch(putProjectThunk(id));
    reset();
    toggleShow(false);
    toggleAlert(true);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form
          onSubmit={handleSubmit(onNewCodeSubmit)}
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
                ref={register}
                isInvalid={!!errors.title}
              />
              {errors.title && (
                <Form.Control.Feedback type="invalid">
                  {errors.title?.message}
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
                ref={register}
                isInvalid={!!errors.description}
              />
              {errors.description && (
                <Form.Control.Feedback type="invalid">
                  {errors.description.message}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>
          <Row>
            <Button className="mt-2  ml-3" type="submit">
              Save
            </Button>
            <Button
              className="mt-2 ml-3 btn-warning"
              onClick={() => toggleShow(false)}
            >
              Cancel
            </Button>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default NewCodeListForm;
