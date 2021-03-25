import React, { ReactElement, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import { AiFillDelete } from 'react-icons/ai';
import { Need } from '../../models/Need';
import {
  deleteNeed,
  editNeed,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { RootState } from '../../store/store';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';

type FormValues = {
  id: string;
  title: string;
  description: string;
};
interface IProps {
  element: Need;
}

const needSchema = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required()
});

function EditNeedForm({ element }: IProps): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();
  const { onOpenClose } = useContext(AccordionContext);
  const [validated] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      id: element.id,
      title: element.title,
      description: element.description
    },
    resolver: joiResolver(needSchema)
  });

  if (!id) {
    return <p>No project selected</p>;
  }

  const project = Utils.ensure(list.find((bank: Bank) => bank.id === id));

  const onEditNeedSubmit = (post: FormValues) => {
    dispatch(
      editNeed({
        projectId: id,
        needId: post.id,
        title: post.title,
        description: post.description
      })
    );
    dispatch(putProjectThunk(id));

    // Close accordion via useContext
    onOpenClose('');
  };

  const removeNeed = () => {
    if (
      element.requirements.length > 0 ||
      Utils.checkIfParent(project.needs, element.id)
    ) {
      window.confirm(
        'This product has one or more connected requirements or has subneeds, please remove them to be able to delete'
      );
    } else {
      dispatch(deleteNeed({ projectId: id, needId: element.id }));
      dispatch(putProjectThunk(id));
    }
    onOpenClose('');
  };

  return (
    <Form
      onSubmit={handleSubmit((e) => onEditNeedSubmit(e))}
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
      <Form.Control type="hidden" name="id" ref={register} />
      <Button className="mt-2" type="submit">
        Save
      </Button>
      <Button className="mt-2  ml-3" variant="warning" onClick={removeNeed}>
        Delete <AiFillDelete />
      </Button>
    </Form>
  );
}

export default EditNeedForm;
