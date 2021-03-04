import { yupResolver } from '@hookform/resolvers/yup';
import React, { ReactElement, useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';

import {
  editRequirementInNeed,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { RootState } from '../../store/store';
import { Requirement } from '../../models/Requirement';
import { Need } from '../../models/Need';

interface IProps {
  element: Requirement;
  index: number;
  need: Need;
  needList: Need[];
}

type FormInput = {
  title: string;
  description: string;
};

const productSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required()
});

export default function EditRequirementForm({
  element,
  index,
  need,
  needList
}: IProps): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const dispatch = useDispatch();
  const { onOpenClose } = useContext(AccordionContext);
  const [validated] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(productSchema)
  });
  if (!id) {
    return <p>No project selected</p>;
  }

  const edit = (post: FormInput) => {
    const reqList = [...need.requirements];
    const requirement: Requirement = {
      ...element
    };
    requirement.title = post.title;
    requirement.description = post.description;
    reqList[index] = requirement;
    const needIndex = needList.findIndex(
      (needElement) => needElement.id === need.id
    );
    dispatch(
      editRequirementInNeed({
        projectId: id,
        needIndex,
        requirement
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
            defaultValue={element.title}
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
          Requirement text
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
