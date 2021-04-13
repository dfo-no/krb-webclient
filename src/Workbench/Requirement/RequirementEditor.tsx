import React, { ReactElement, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useHistory, useRouteMatch } from 'react-router-dom';
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
import { Need } from '../../models/Need';

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

const textSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal('text').required(),
  max: Joi.number().required(),
  text: Joi.string().trim().max(Joi.ref('max')).required()
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
        { is: 'codelist', then: codelistSchema },
        { is: 'text', then: textSchema }
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
  const history = useHistory();

  const projectMatch = useRouteMatch<RouteParams>(
    '/workbench/:projectId/need/:needId/requirement/:requirementId/edit'
  );
  const { needId } = useSelector((state: RootState) => state.selectNeed);

  if (projectMatch?.params.needId && projectMatch?.params.needId === needId) {
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

  const project = Utils.ensure(list.find((element) => element.id === id));
  const need = Utils.ensure(
    project.needs.find((element) => element.id === needId)
  );

  const requirement = need.requirements.find((element) => element.id === reqId);
  const defaultValues: Requirement | Record<string, never> =
    requirement !== undefined ? { ...requirement } : {};
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

  if (requirement === undefined) {
    history.push(`/workbench/${project.id}/requirement`);
    return <p> Could not find requirement </p>;
  }

  if (!needId || !reqId) {
    return <p>You have to select a requirement to work with</p>;
  }

  const saveRequirement = async (post: Requirement) => {
    const oldReqIndex = Utils.ensure(
      need.requirements.findIndex((element) => element.id === reqId)
    );
    await dispatch(
      editRequirementInNeed({
        projectId: project.id,
        requirement: post,
        oldNeedId: need.id,
        needId: post.needId,
        requirementIndex: oldReqIndex
      })
    );
    await dispatch(putProjectThunk(project.id));
    await dispatch(selectNeed(post.needId));
  };

  const deleteVariant = (variant: IVariant) => {
    const editRequirement = { ...requirement };
    const newVariants = requirement.layouts.filter(
      (element) => element.id !== variant.id
    );
    editRequirement.layouts = newVariants;
    dispatch(putProjectThunk(project.id));
  };

  const needOptions = (needList: Need[]) => {
    const result = needList.map((element: any) => {
      return (
        <option key={element.id} value={element.id}>
          {element.title}
        </option>
      );
    });
    return result;
  };

  return (
    <>
      <h3 className="mt-3">
        {Utils.capitalizeFirstLetter(requirement.requirement_Type)} Page{' '}
      </h3>
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
        <Form.Group as={Row}>
          <Form.Label column sm={1}>
            Need
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              as="select"
              name="needId"
              ref={register}
              defaultValue={requirement.needId}
              isInvalid={!!errors.needId}
            >
              {needOptions(project.needs)}
            </Form.Control>
            {errors.needId && (
              <Form.Control.Feedback as={Col} type="invalid">
                {errors.needId?.message}
              </Form.Control.Feedback>
            )}
          </Col>
        </Form.Group>

        <VariantArray
          {...{
            control,
            register,
            getValues,
            setValue,
            errors,
            project,
            defaultValues
          }}
        />
        {process.env.NODE_ENV === 'development' &&
          Object.keys(errors).length > 0 && (
            <Alert variant="warning">
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </Alert>
          )}
      </Form>
    </>
  );
}
