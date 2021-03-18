import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import Utils from '../../common/Utils';
import { IVariant } from '../../models/IVariant';
import { RootState } from '../../store/store';
import { selectRequirement } from '../../store/reducers/selectedRequirement-reducer';
import { selectNeed } from '../../store/reducers/selectedNeed-reducer';
import {
  editRequirementInNeed,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import VariantArray from './VariantArray';
import { Requirement } from '../../models/Requirement';

const valueSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal('value').required(),
  step: Joi.number().min(0).max(1000000000).required(),
  min: Joi.number().min(0).max(1000000000).required(),
  max: Joi.number().min(0).max(1000000000).required(),
  unit: Joi.string().required()
});

const codeSchema = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().equal('code').required()
});

const codelistSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal('codelist').required(),
  codelist: Joi.object().keys({
    id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    codes: Joi.array().items(codeSchema).min(1).required(),
    type: Joi.string().equal('codelist').required()
  })
});

const variantSchema = Joi.object().keys({
  id: Joi.string().required(),
  requirementText: Joi.string().required(),
  instruction: Joi.string().required(),
  use_Product: Joi.boolean().required(),
  use_Spesification: Joi.boolean().required(),
  use_Qualification: Joi.boolean().required(),
  products: Joi.array()
    .items()
    .when('use_Product', {
      is: true,
      then: Joi.array().items(Joi.string()).min(1).required()
    }),
  alternatives: Joi.array().items(
    Joi.alternatives().conditional('.type', {
      switch: [
        { is: 'value', then: valueSchema },
        { is: 'codelist', then: codelistSchema }
      ]
    })
  )
});

const requirementSchema = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().max(100).required(),
  description: Joi.string().required(),
  needId: Joi.string().required(),
  layouts: Joi.array().items(variantSchema),
  kind: Joi.string().required(),
  requirement_Type: Joi.string().required(),
  type: Joi.string().required()
});

interface RouteParams {
  projectId: string;
  needId: string;
  requirementId: string;
}

export default function RequirementEditor(): ReactElement {
  const [validated] = useState(false);
  const dispatch = useDispatch();

  const projectMatch = useRouteMatch<RouteParams>(
    '/workbench/:projectId/need/:needId/requirement/:requirementId/edit'
  );

  if (projectMatch?.params.needId) {
    dispatch(selectNeed(projectMatch?.params.needId));
  }

  if (projectMatch?.params.requirementId) {
    dispatch(selectRequirement(projectMatch?.params.requirementId));
  }

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

  const defaultValues: Requirement = { ...requirement };

  const {
    control,
    register,
    handleSubmit,
    errors,
    getValues,
    setValue
  } = useForm<Requirement>({
    resolver: joiResolver(requirementSchema),
    defaultValues
  });

  if (!needId || !reqId) {
    return <p>You have to select a requirement to work with</p>;
  }

  const saveRequirement = (post: Requirement) => {
    dispatch(
      editRequirementInNeed({
        projectId: project.id,
        needIndex: nIndex,
        requirement: post
      })
    );
    dispatch(putProjectThunk(project.id));
  };

  const deleteVariant = (variant: IVariant) => {
    const editRequirement = { ...requirement };
    const newVariants = requirement.layouts.filter(
      (element) => element.id !== variant.id
    );
    editRequirement.layouts = newVariants;
    dispatch(
      editRequirementInNeed({
        projectId: project.id,
        needIndex: nIndex,
        requirement: editRequirement
      })
    );
    dispatch(putProjectThunk(project.id));
  };

  return (
    <Card>
      <Card.Header>
        {Utils.capitalizeFirstLetter(requirement.requirement_Type)} Page
      </Card.Header>
      <Card.Body>
        <Form
          onSubmit={handleSubmit((e) => saveRequirement(e))}
          noValidate
          validated={validated}
        >
          <Form.Control
            readOnly
            as="input"
            name="id"
            type="hidden"
            ref={register}
            isInvalid={!!errors.id}
          />
          <Form.Control
            readOnly
            as="input"
            name="description"
            type="hidden"
            ref={register}
            isInvalid={!!errors.description}
          />
          <Form.Control
            readOnly
            as="input"
            name="needId"
            type="hidden"
            ref={register}
            isInvalid={!!errors.needId}
          />
          <Form.Control
            readOnly
            as="input"
            name="kind"
            type="hidden"
            ref={register}
            isInvalid={!!errors.kind}
          />
          <Form.Control
            readOnly
            as="input"
            name="type"
            type="hidden"
            ref={register}
            isInvalid={!!errors.type}
          />
          <Form.Control
            readOnly
            as="input"
            name="requirement_Type"
            type="hidden"
            ref={register}
            isInvalid={!!errors.requirement_Type}
          />

          <Form.Group as={Row}>
            <Form.Label column sm={1}>
              Title
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                name="title"
                ref={register}
                isInvalid={!!errors.title}
              />
              {errors.title && (
                <Form.Control.Feedback as={Col} type="invalid">
                  {errors.title?.message}
                </Form.Control.Feedback>
              )}
            </Col>
            <Col sm={3}>
              <Button type="submit">Save</Button>
            </Col>
          </Form.Group>

          <VariantArray
            {...{
              control,
              register,
              getValues,
              setValue,
              errors,
              defaultValues,
              project
            }}
          />

          <div style={{ color: 'red' }}>
            <pre>
              {Object.keys(errors).length > 0 && (
                <div>{JSON.stringify(errors, null, 2)}</div>
              )}
            </pre>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
