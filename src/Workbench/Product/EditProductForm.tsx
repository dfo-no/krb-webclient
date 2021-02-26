import React, { ReactElement } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../models/Product';

import {
  editProduct,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { RootState } from '../../store/store';

interface IProps {
  element: Product;
}

type FormInput = {
  title: string;
  description: string;
};

export default function ProductForm({ element }: IProps): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  if (!id) {
    return <p>No project selected</p>;
  }

  const edit = (post: FormInput) => {
    const newProduct = { ...element };
    newProduct.title = post.title;
    newProduct.description = post.description;
    dispatch(
      editProduct({
        projectId: id,
        product: newProduct
      })
    );
    dispatch(putProjectThunk(id));
  };

  return (
    <Form onSubmit={handleSubmit(edit)}>
      <Form.Group as={Row}>
        <Form.Label className="ml-2">Title</Form.Label>
        <Form.Control
          className="m-2"
          name="title"
          ref={register}
          defaultValue={element.title}
        />
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label className="ml-2">Description</Form.Label>
        <Form.Control
          className="m-2"
          name="description"
          ref={register}
          defaultValue={element.description}
        />
      </Form.Group>
      <Button type="submit" className="m-2">
        Save
      </Button>
    </Form>
  );
}
