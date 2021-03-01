import React, { ReactElement, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { v4 as uuidv4 } from 'uuid';
import {
  addProduct,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { RootState } from '../../store/store';
import { Product } from '../../models/Product';

type FormValues = {
  title: string;
  description: string;
};
interface IProps {
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const productSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required()
});

function NewProductForm({ toggleShow }: IProps): ReactElement {
  const dispatch = useDispatch();
  const [validated] = useState(false);

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(productSchema)
  });

  const { id } = useSelector((state: RootState) => state.selectedProject);

  if (!id) {
    return <div>Loading Productform</div>;
  }

  const onNewProductSubmit = (post: FormValues) => {
    const product: Product = {
      // TODO: remove uuidv4, this should be CosmosDB's task (perhaps by reference)
      id: uuidv4(),
      title: post.title,
      description: post.description,
      parent: '',
      type: 'product'
    };
    dispatch(addProduct({ id, product }));
    dispatch(putProjectThunk(id));

    // reset the form
    reset();
    toggleShow(false);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form
          onSubmit={handleSubmit(onNewProductSubmit)}
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

export default NewProductForm;
