import React, { ReactElement, useState } from 'react';
import { Accordion, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { v4 as uuidv4 } from 'uuid';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { Need } from '../../models/Need';
import { Requirement } from '../../models/Requirement';
import { RequirementLayout } from '../../models/RequirementLayout';
import { RootState } from '../../store/store';

import {
  CodelistAlternative,
  ValueAlternative
} from '../../models/Alternatives';
import CodeListAlternative from './CodeListAlternative';
import Value from './ValueAlternative';
import projectReducer, {
  editRequirementInNeed,
  putProjectThunk
} from '../../store/reducers/project-reducer';

interface IProps {
  alternatives: (CodelistAlternative | ValueAlternative)[];
  requirement: Requirement;
  project: Bank;
  nIndex: number;
  layout: RequirementLayout;
}
type FormInput = {
  alternative: string;
};

export default function Alternatives({
  alternatives,
  requirement,
  project,
  nIndex,
  layout
}: IProps): ReactElement {
  const dispatch = useDispatch();
  const { register, control, handleSubmit, errors } = useForm();
  const newAlternative = (data: FormInput) => {
    // TODO: prevent type info from having more than one alternative, hide button or similar
    let alternative: CodelistAlternative | ValueAlternative;
    const newRequirement = { ...requirement };
    if (data.alternative === 'Value') {
      alternative = {
        id: uuidv4(),
        type: 'value',
        step: 0,
        min: 0,
        max: 0,
        unit: ''
      };
    } else {
      alternative = {
        id: uuidv4(),
        type: 'codelist',
        codelist: project.codelist[0]
      };
    }
    const newLayoutList = [...requirement.layouts];
    const layoutindex = requirement.layouts.findIndex(
      (element) => element.id === layout.id
    );
    const newLayout = { ...layout };
    const newalternatives = [...layout.alternatives, alternative];
    newLayout.alternatives = newalternatives;
    newLayoutList[layoutindex] = newLayout;
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

  const alternativeList = (
    alternativeElements: (CodelistAlternative | ValueAlternative)[]
  ) => {
    const array = alternativeElements.map(
      (element: CodelistAlternative | ValueAlternative) => {
        if (element.type === 'codelist') {
          return (
            <CodeListAlternative
              alternative={element as CodelistAlternative}
              project={project}
              key={element.id}
              nIndex={nIndex}
              requirement={requirement}
              layout={layout}
            />
          );
        }
        return (
          <Value
            key={element.id}
            alternative={element as ValueAlternative}
            project={project}
            nIndex={nIndex}
            requirement={requirement}
            layout={layout}
          />
        );
      }
    );
    return <Accordion>{array}</Accordion>;
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit(newAlternative)}>
          <Form.Group>
            <Form.Label>Select Alternative Type</Form.Label>
            <Form.Control as="select" name="alternative" ref={register}>
              <option>Codelist</option>
              <option>Value</option>
            </Form.Control>
          </Form.Group>
          <Button className="mb-4" type="submit">
            Add Alternative
          </Button>
        </Form>
        <h6>{alternatives.length > 0 && 'Alternatives'}</h6>
        {alternativeList(alternatives)}
      </Card.Body>
    </Card>
  );
}
