import React, { ReactElement } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
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

export default function EditCodeForm({ element }: IProps): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { listId } = useSelector((state: RootState) => state.selectedCodeList);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
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
