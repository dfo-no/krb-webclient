import React, { ReactElement, useState } from 'react';
import { Accordion, Button, Card, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ValueAlternative } from '../../models/Alternatives';
import { Bank } from '../../models/Bank';
import { Requirement } from '../../models/Requirement';
import { RequirementLayout } from '../../models/RequirementLayout';
import {
  editRequirementInNeed,
  putProjectThunk
} from '../../store/reducers/project-reducer';

interface IProps {
  alternative: ValueAlternative;
  project: Bank;
  layout: RequirementLayout;
  nIndex: number;
  requirement: Requirement;
}

type FormInput = {
  min: number;
  max: number;
  step: number;
  unit: string;
};

export default function Value({
  alternative,
  project,
  layout,
  nIndex,
  requirement
}: IProps): ReactElement {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const editValue = (post: FormInput) => {
    const newAlternative = { ...alternative };
    newAlternative.step = post.step;
    newAlternative.min = post.min;
    newAlternative.max = post.max;
    newAlternative.unit = post.unit;
    const newLayout = { ...layout };
    const newLayoutList = [...requirement.layouts];
    const layoutindex = requirement.layouts.findIndex(
      (element) => element.id === layout.id
    );
    const alternativeIndex = layout.alternatives.findIndex(
      (element) => element.id === alternative.id
    );
    const newalternatives = [...layout.alternatives];
    newalternatives[alternativeIndex] = newAlternative;
    newLayout.alternatives = newalternatives;
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
    <Card key={alternative.id}>
      <Accordion.Toggle as={Card.Header} eventKey={alternative.id}>
        Value
        {alternative.unit !== '' &&
          `  Spenn ${alternative.min} - ${alternative.max} ${alternative.unit}, Step ${alternative.step}`}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={alternative.id}>
        <Card.Body>
          <Form onSubmit={handleSubmit(editValue)}>
            <Form.Group as={Row}>
              <Form.Label className="ml-2">Minimum</Form.Label>
              <Form.Control
                className="m-2"
                type="number"
                name="min"
                ref={register}
                defaultValue={alternative.min}
              />
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label className="ml-2">Maximum</Form.Label>
              <Form.Control
                className="m-2"
                type="number"
                name="max"
                ref={register}
                defaultValue={alternative.max}
              />
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label className="ml-2">Step</Form.Label>
              <Form.Control
                className="m-2"
                type="number"
                name="step"
                ref={register}
                defaultValue={alternative.step}
              />
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label className="ml-2">Unit</Form.Label>
              <Form.Control
                className="m-2"
                type="text"
                name="unit"
                ref={register}
                defaultValue={alternative.unit}
              />
              <Button type="submit" className="m-2">
                Save
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}
