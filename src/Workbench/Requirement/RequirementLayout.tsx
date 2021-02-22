import React, { ReactElement, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Bank } from '../../models/Bank';
import { Requirement } from '../../models/Requirement';
import { RequirementLayout } from '../../models/RequirementLayout';

import {
  editRequirementInNeed,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import Alternatives from './Alternatives';

interface IProps {
  layout: RequirementLayout;
  nIndex: number;
  project: Bank;
  requirement: Requirement;
}

type FormValues = {
  reqText: string;
  instruction: string;
};

const layoutSchema = yup.object().shape({
  id: yup.number().required(),
  reqText: yup.string().required().min(5),
  instruction: yup.string().required().min(5)
});

export default function Layout({
  project,
  nIndex,
  layout,
  requirement
}: IProps): ReactElement {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      id: layout.id,
      reqText: layout.requirementText,
      instruction: layout.instruction
    },
    resolver: yupResolver(layoutSchema)
  });
  const [validated] = useState(false);

  const onEditLayoutSubmit = (post: FormValues) => {
    const newLayout = {
      id: layout.id,
      requirementText: post.reqText,
      instruction: post.instruction,
      alternatives: layout.alternatives
    };
    const newLayoutList = [...requirement.layouts];
    const layoutindex = requirement.layouts.findIndex(
      (element) => element.id === layout.id
    );
    newLayoutList[layoutindex] = newLayout;
    const newRequirement = { ...requirement };
    newRequirement.layouts = newLayoutList;
    dispatch(
      editRequirementInNeed({
        projectId: project.id,
        needIndex: nIndex,
        requirement: newRequirement
      })
    );
    dispatch(putProjectThunk(project.id));
  };
  return (
    <Card className="bg-light m-3">
      <Card.Body>
        <h4>Layout</h4>
        <Form
          onSubmit={handleSubmit(onEditLayoutSubmit)}
          noValidate
          validated={validated}
        >
          <Form.Group>
            <Form.Label>Requirement Text</Form.Label>
            <Form.Control
              as="textarea"
              name="reqText"
              ref={register}
              isInvalid={!!errors.reqText}
            />
            {errors.reqText && (
              <Form.Control.Feedback type="invalid">
                {errors.reqText.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Instruction</Form.Label>
            <Form.Control
              as="textarea"
              name="instruction"
              ref={register}
              isInvalid={!!errors.instruction}
            />
            {errors.instruction && (
              <Form.Control.Feedback type="invalid">
                {errors.instruction?.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button className="mt-2 mb-4" type="submit">
            Save
          </Button>
        </Form>
        <Alternatives
          project={project}
          nIndex={nIndex}
          requirement={requirement}
          alternatives={layout.alternatives}
          layout={layout}
        />
      </Card.Body>
    </Card>
  );
}
