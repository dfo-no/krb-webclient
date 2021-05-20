import React, { ReactElement, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFieldArray, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import { useTranslation } from 'react-i18next';
import Utils from '../../common/Utils';
import { RootState } from '../../store/store';
import { selectRequirement } from '../../store/reducers/selectedRequirement-reducer';
import { selectNeed } from '../../store/reducers/selectedNeed-reducer';
import {
  editRequirementInNeed,
  getProjectsThunk,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import VariantArray from './VariantArray';
import { Requirement } from '../../models/Requirement';
import { Need } from '../../models/Need';
import { selectProject } from '../../store/reducers/selectedProject-reducer';
import ErrorSummary from '../../Form/ErrorSummary';
import ModelType from '../../models/ModelType';
import QuestionType from '../../models/QuestionType';

export const SliderSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionType.Q_SLIDER).required(),
  config: Joi.object().keys({
    step: Joi.number().min(0).max(1000000000).required(),
    min: Joi.number().min(0).max(1000000000).required(),
    max: Joi.number().min(0).max(1000000000).required(),
    unit: Joi.string().required()
  })
});

/* const codeSchema = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().equal('code').required()
}); */

export const CodelistSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionType.Q_CODELIST).required()
});

export const TextSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionType.Q_TEXT).required(),
  config: Joi.object().keys({
    max: Joi.number().required()
  })
});

export const PeriodDateSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionType.Q_PERIOD_DATE).required(),
  config: Joi.object().keys({
    minDays: Joi.number().required(),
    maxDays: Joi.number().required(),
    fromDate: Joi.string().trim().allow('').required(),
    toDate: Joi.string().trim().allow('').required()
  })
});

export const TimeSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionType.Q_TIME).required(),
  config: Joi.object().keys({
    fromTime: Joi.string().trim().allow('').required(),
    toTime: Joi.string().trim().allow('').required()
  })
});

export const CheckboxSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionType.Q_CHECKBOX).required(),
  config: Joi.object().keys({
    value: Joi.boolean()
  })
});

export const FileUploadSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionType.Q_FILEUPLOAD).required(),
  config: Joi.object().keys({
    fileEndings: Joi.string().allow('')
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
    })
    .required(),
  alternatives: Joi.array().items(
    Joi.alternatives().conditional('.type', {
      switch: [
        { is: QuestionType.Q_SLIDER, then: SliderSchema },
        { is: QuestionType.Q_CODELIST, then: CodelistSchema },
        { is: QuestionType.Q_TEXT, then: TextSchema },
        { is: QuestionType.Q_PERIOD_DATE, then: PeriodDateSchema },
        { is: QuestionType.Q_TIME, then: TimeSchema },
        { is: QuestionType.Q_CHECKBOX, then: CheckboxSchema },
        { is: QuestionType.Q_FILEUPLOAD, then: FileUploadSchema }
      ]
    })
  )
});

const requirementSchema = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().max(100).required(),
  description: Joi.string().required(),
  needId: Joi.string().required(),
  variants: Joi.array().items(variantSchema),
  kind: Joi.string().required(),
  requirement_Type: Joi.string().required(),
  type: Joi.string().equal(ModelType.requirement).required()
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
  const { t } = useTranslation();
  const projectMatch = useRouteMatch<RouteParams>(
    '/workbench/:projectId/need/:needId/requirement/:requirementId/edit'
  );

  if (projectMatch?.params.projectId) {
    dispatch(selectProject(projectMatch?.params.projectId));
  }

  if (projectMatch?.params.needId) {
    dispatch(selectNeed(projectMatch?.params.needId));
  }

  if (projectMatch?.params.requirementId) {
    dispatch(selectRequirement(projectMatch?.params.requirementId));
  }

  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const { needId } = useSelector((state: RootState) => state.selectNeed);
  const { reqId } = useSelector(
    (state: RootState) => state.selectedRequirement
  );

  useEffect(() => {
    async function fetchEverything() {
      setTimeout(async () => {
        await dispatch(getProjectsThunk());
      }, 10);
    }
    if (!list) {
      fetchEverything();
    }
  }, [dispatch, list]);

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
    formState,
    getValues,
    setValue
  } = useForm<Requirement>({
    resolver: joiResolver(requirementSchema),
    defaultValues: { ...requirement }
  });

  const { remove } = useFieldArray({
    keyName: 'guid',
    control,
    name: 'variants'
  });

  if (requirement === undefined) {
    history.push(`/workbench/${project.id}/requirement`);
    return <p> Could not find requirement </p>;
  }

  if (list.length === 0 || !needId || !reqId) {
    return <p>Loading requirement ...</p>;
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

  /* const deleteVariant = (variant: IVariant) => {
    const editRequirement = { ...requirement };
    const newVariants = requirement.variants.filter(
      (element) => element.id !== variant.id
    );
    editRequirement.variants = newVariants;
    dispatch(putProjectThunk(project.id));
  }; */

  const needOptions = (needList: Need[]) => {
    const result = needList.map((element) => {
      return (
        <option key={element.id} value={element.id}>
          {element.title}
        </option>
      );
    });
    return result;
  };
  const { errors } = formState;

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
        <Form.Control readOnly as="input" type="hidden" {...register('id')} />
        <Form.Control
          readOnly
          as="input"
          type="hidden"
          {...register('description')}
        />
        <Form.Control
          readOnly
          as="input"
          type="hidden"
          {...register('needId')}
        />
        <Form.Control readOnly as="input" type="hidden" {...register('kind')} />
        <Form.Control
          as="input"
          type="hidden"
          {...register('type')}
          isInvalid={!!errors.type}
        />
        <Form.Control
          readOnly
          as="input"
          type="hidden"
          {...register('requirement_Type')}
          isInvalid={!!errors.requirement_Type}
        />

        <Form.Group as={Row}>
          <Form.Label column sm={1}>
            {t('Title')}
          </Form.Label>
          <Col sm={8}>
            <Form.Control {...register('title')} isInvalid={!!errors.title} />
            {errors.title && (
              <Form.Control.Feedback as={Col} type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            )}
          </Col>
          <Col sm={3}>
            <Button type="submit">{t('save')}</Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={1}>
            Need
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              as="select"
              {...register('needId')}
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
            setValue,
            getValues,
            formState,
            defaultValues,
            project
          }}
          {...{
            remove
          }}
        />
        <ErrorSummary errors={errors} />
      </Form>
    </>
  );
}
