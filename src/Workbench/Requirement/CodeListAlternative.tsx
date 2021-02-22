import React, { ReactElement, useState } from 'react';
import { Accordion, Button, Card, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { CodelistAlternative } from '../../models/Alternatives';
import { Bank } from '../../models/Bank';
import { Codelist } from '../../models/Codelist';
import { Requirement } from '../../models/Requirement';
import { RequirementLayout } from '../../models/RequirementLayout';
import projectReducer, {
  editRequirementInNeed,
  putProjectThunk
} from '../../store/reducers/project-reducer';

interface IProps {
  alternative: CodelistAlternative;
  project: Bank;
  layout: RequirementLayout;
  nIndex: number;
  requirement: Requirement;
}

type FormInput = {
  codelist: string;
};

export default function CodeListAlternative({
  alternative,
  project,
  layout,
  nIndex,
  requirement
}: IProps): ReactElement {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const selectOptions = () => {
    return project.codelist.map((element: Codelist) => {
      return <option>{element.title}</option>;
    });
  };
  const editAlternative = (post: FormInput) => {
    const codelistIndex = project.codelist.findIndex(
      (element) => element.title === post.codelist
    );
    const newAlternative = { ...alternative };
    newAlternative.codelist = project.codelist[codelistIndex];
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
        {`Codelist     ${alternative.codelist.title} `}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={alternative.id}>
        <Card.Body>
          <Form onSubmit={handleSubmit(editAlternative)}>
            <Form.Group as={Row}>
              <Form.Label className="ml-2">Codelist</Form.Label>
              <Form.Control
                className="m-2"
                as="select"
                name="codelist"
                defaultValue={alternative.codelist.title}
                ref={register}
              >
                {selectOptions()}
              </Form.Control>
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
