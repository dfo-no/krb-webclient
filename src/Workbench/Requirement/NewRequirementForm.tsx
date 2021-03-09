import React, { ReactElement, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { v4 as uuidv4 } from 'uuid';
import {
  putProjectThunk,
  setRequirementListToNeed
} from '../../store/reducers/project-reducer';
import { RootState } from '../../store/store';

import { Need } from '../../models/Need';
import { Requirement } from '../../models/Requirement';
import MODELTYPE from '../../models/ModelType';
import RequirementType from '../../models/RequirementType';

type FormValues = {
  title: string;
  description: string;
};
interface IProps {
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
  toggleAlert: React.Dispatch<React.SetStateAction<boolean>>;
  need: Need;
  needList: Need[];
  type: RequirementType;
}

const requirementSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required()
});

function NewRequirementForm({
  toggleShow,
  toggleAlert,
  need,
  needList,
  type
}: IProps): ReactElement {
  const dispatch = useDispatch();
  const [validated] = useState(false);

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(requirementSchema)
  });

  const { id } = useSelector((state: RootState) => state.selectedProject);

  if (!id) {
    return <div>Loading Requirementform</div>;
  }

  const onNewRequirementSubmit = (post: FormValues) => {
    const requirement: Requirement = {
      id: uuidv4(),
      title: post.title,
      description: post.description,
      needId: need.id,
      layouts: [],
      kind: 'yes/no',
      type: MODELTYPE.requirement,
      requirement_Type: type
    };
    const reqList = [...need.requirements];
    reqList.push(requirement);
    const needIndex = needList.findIndex((element) => element.id === need.id);
    reset();
    dispatch(
      setRequirementListToNeed({
        projectId: id,
        needIndex,
        reqList
      })
    );
    dispatch(putProjectThunk(id));
    reset();
    toggleShow(false);
    toggleAlert(true);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form
          onSubmit={handleSubmit(onNewRequirementSubmit)}
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

export default NewRequirementForm;
