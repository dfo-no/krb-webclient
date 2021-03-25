import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import { Code } from '../../models/Code';

import {
  deleteCodeInCodelist,
  editCodeInCodelist,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { RootState } from '../../store/store';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';

interface IProps {
  element: Code;
}

type FormInput = {
  title: string;
  description: string;
};

const codeSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required()
});

export default function EditCodeForm({ element }: IProps): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { listId } = useSelector((state: RootState) => state.selectedCodeList);
  const { onOpenClose } = useContext(AccordionContext);
  const dispatch = useDispatch();
  const [validated] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(codeSchema)
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

  const removeCode = () => () => {
    dispatch(
      deleteCodeInCodelist({
        projectId: id,
        codelistId: listId,
        codeId: element.id
      })
    );
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
        <Button className="mt-2  ml-3" variant="warning" onClick={removeCode()}>
          Delete <AiFillDelete />
        </Button>
      </Row>
    </Form>
  );
}
