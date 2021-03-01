import { yupResolver } from '@hookform/resolvers/yup';
import React, { ReactElement, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Code } from '../../models/Code';

import {
  editCodeInCodelist,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { RootState } from '../../store/store';

interface IProps {
  element: Code;
}

type FormInput = {
  title: string;
  description: string;
};

const codeSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required()
});

export default function EditCodeForm({ element }: IProps): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { listId } = useSelector((state: RootState) => state.selectedCodeList);
  const dispatch = useDispatch();
  const [validated] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(codeSchema)
  });
  if (!id) {
    return <p>No project selected</p>;
  }

  if (!listId) {
    return <p>No codelist selected</p>;
  }

  const edit = (post: FormInput) => {
    const newCode = { ...element };
    newCode.title = post.title;
    newCode.description = post.description;
    dispatch(
      editCodeInCodelist({
        projectId: id,
        codelistId: listId,
        code: newCode
      })
    );
    dispatch(putProjectThunk(id));
    onOpenClose('');
  };

  return (
    <Form
      onSubmit={handleSubmit(edit)}
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
            defaultValue={element.title}
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
            defaultValue={element.description}
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
      </Row>
    </Form>
  );
}
