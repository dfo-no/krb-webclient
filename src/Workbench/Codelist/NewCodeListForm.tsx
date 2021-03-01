import React, { ReactElement, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { v4 as uuidv4 } from 'uuid';
import {
  addCodelist,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { RootState } from '../../store/store';
import { Codelist } from '../../models/Codelist';

type FormValues = {
  title: string;
  description: string;
};
interface IProps {
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const codeListSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required()
});

function NewCodeListForm({ toggleShow }: IProps): ReactElement {
  const dispatch = useDispatch();
  const [validated] = useState(false);

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(codeListSchema)
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
      type: 'codelist'
    };
    dispatch(dispatch(addCodelist({ id, codelist: codeList })));
    dispatch(putProjectThunk(id));
    reset();
    toggleShow(false);
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
