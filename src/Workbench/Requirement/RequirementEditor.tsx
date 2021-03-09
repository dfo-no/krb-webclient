import React, { ReactElement, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { v4 as uuidv4 } from 'uuid';
import Utils from '../../common/Utils';
import { RequirementLayout } from '../../models/RequirementLayout';
import { RootState } from '../../store/store';
import {
  editRequirementInNeed,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import Layout from './RequirementLayout';

type FormInput = {
  title: string;
};

const requirementSchema = yup.object().shape({
  id: yup.string().required(),
  title: yup
    .string()
    .required()
    .min(3)
    .matches(/^([^0-9]*)$/, 'Title can not contain numbers')
});

export default function RequirementEditor(): ReactElement {
  const [validated] = useState(false);
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
  const nIndex = project.needs.findIndex((element) => element.id === need.id);
  const requirement = Utils.ensure(
    need.requirements.find((element) => element.id === reqId)
  );

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      title: requirement.title
    },
    resolver: yupResolver(requirementSchema)
  });

  if (!list) {
    return <p>Loading ....</p>;
  }
  if (!needId || !reqId) {
    return <p>You have to select a requirement to work with</p>;
  }
  const updateRequirement = (post: FormInput) => {
    const newRequirement = { ...requirement };
    newRequirement.title = post.title;
    dispatch(
      editRequirementInNeed({
        projectId: project.id,
        needIndex: nIndex,
        requirement: newRequirement
      })
    );
    dispatch(putProjectThunk(project.id));
  };

  const newLayout = () => () => {
    const newRequirement = { ...requirement };
    const layout: RequirementLayout = {
      id: uuidv4(),
      requirementText: '',
      instruction: '',
      alternatives: [],
      use_Product: false,
      use_Spesification: false,
      use_Qualification: false,
      products: []
    };
    const newLayouts = [...requirement.layouts, layout];
    newRequirement.layouts = newLayouts;
    dispatch(
      editRequirementInNeed({
        projectId: project.id,
        needIndex: nIndex,
        requirement: newRequirement
      })
    );
    dispatch(putProjectThunk(project.id));
  };

  const layouts = (layoutArray: RequirementLayout[]) => {
    const array = layoutArray.map((layout: RequirementLayout) => {
      return (
        <Layout
          project={project}
          requirement={requirement}
          layout={layout}
          nIndex={nIndex}
          key={uuidv4()}
        />
      );
    });
    return <>{array}</>;
  };

  return (
    <>
      <h4 className="mt-3 mb-3">{requirement.requirement_Type} Page</h4>
      <Form
        onSubmit={handleSubmit(updateRequirement)}
        noValidate
        validated={validated}
      >
        <Form.Group>
          <Form.Label>Title</Form.Label>
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
        </Form.Group>
        <Button type="submit" className="mt-2 mb-2">
          Save Title
        </Button>
      </Form>

      <Button onClick={newLayout()} className="mt-2 mb-2">
        New Variant
      </Button>

      {layouts(requirement.layouts)}
    </>
  );
}
