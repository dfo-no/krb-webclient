import React, { ReactElement, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFieldArray, useForm } from 'react-hook-form';
import Utils from '../../common/Utils';
import { RequirementLayout } from '../../models/RequirementLayout';
import { RootState } from '../../store/store';

export default function RequirementEditor(): ReactElement {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const { reqId } = useSelector(
    (state: RootState) => state.selectedRequirement
  );
  const { needId } = useSelector((state: RootState) => state.selectNeed);
  const project = Utils.ensure(list.find((element) => element.id === id));
  const need = Utils.ensure(
    project.needs.find((element) => element.id === needId)
  );
  const requirement = Utils.ensure(
    need.requirements.find((element) => element.id === reqId)
  );

  const { register, control, handleSubmit, errors } = useForm({
    defaultValues: {
      layouts: requirement.layouts
    }
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: 'layouts' // unique name for your Field Array
      // keyName: "id", default to "id", you can change the key name
    }
  );
  if (!list) {
    return <p>Loading ....</p>;
  }
  if (!needId || !reqId) {
    return <p>You have to select a requirement to work with</p>;
  }

  const newLayout = () => () => {
    const layout: RequirementLayout = {
      id: '',
      requirementText: '',
      instruction: '',
      alternatives: []
    };
  };

  return (
    <>
      <Form onSubmit={handleSubmit(newLayout)}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            defaultValue={requirement.title}
            ref={register}
          />
        </Form.Group>
        {fields.map((field, index) => (
          <>
            <Form.Group key={field.id}>
              <Form.Label>Requirement Text</Form.Label>
              <Form.Control
                name={`layouts${index}].requirementText`}
                defaultValue={field.requirementText}
                ref={register}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Instruction</Form.Label>
              <Form.Control
                name={`layouts${index}].instruction`}
                defaultValue={field.instruction}
                ref={register}
              />
              <Form.Control
                type="hidden"
                name={`layouts${index}].id`}
                ref={register}
              />
            </Form.Group>

            <Button
              onClick={() => {
                append({ id: '', requirementText: '', instruction: '' });
              }}
            >
              New Layout
            </Button>
          </>
        ))}

        <Button onClick={newLayout()}>New Layout</Button>
      </Form>
    </>
  );
}
