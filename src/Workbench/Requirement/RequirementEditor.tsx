import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React, { ReactElement, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import ModelType from '../../models/ModelType';
import { Need } from '../../models/Need';
import QuestionEnum from '../../models/QuestionEnum';
import { Requirement } from '../../models/Requirement';
import RequirementType from '../../models/RequirementType';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  editRequirementInNeed,
  getProjectsThunk,
  putProjectByIdThunk
} from '../../store/reducers/project-reducer';
import { selectNeed } from '../../store/reducers/selectedNeed-reducer';
import { selectProject } from '../../store/reducers/selectedProject-reducer';
import { selectRequirement } from '../../store/reducers/selectedRequirement-reducer';
import VariantArray from './VariantArray';

export const SliderSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_SLIDER).required(),
  config: Joi.object().keys({
    step: Joi.number().min(0).max(1000000000).required(),
    min: Joi.number().min(0).max(1000000000).required(),
    max: Joi.number().min(0).max(1000000000).required(),
    unit: Joi.string().required()
  })
});

export const CodelistSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_CODELIST).required(),
  config: Joi.object().keys({
    codelist: Joi.string().required(),
    multipleSelect: Joi.boolean().required()
  })
});

export const TextSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_TEXT).required(),
  config: Joi.object().keys({
    max: Joi.number().required().min(0)
  })
});

export const PeriodDateSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_PERIOD_DATE).required(),
  config: Joi.object().keys({
    fromDate: Joi.alternatives([
      Joi.date().iso(),
      Joi.string().valid('')
    ]).required(),
    toDate: Joi.alternatives([
      Joi.date().iso(),
      Joi.string().valid('')
    ]).required()
  })
});

export const TimeSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_TIME).required(),
  config: Joi.object().keys({
    fromTime: Joi.string().trim().allow('').required(),
    toTime: Joi.string().trim().allow('').required()
  })
});

export const CheckboxSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_CHECKBOX).required(),
  config: Joi.object().keys({
    value: Joi.boolean()
  })
});

export const FileUploadSchema = Joi.object().keys({
  id: Joi.string().required(),
  type: Joi.string().equal(QuestionEnum.Q_FILEUPLOAD).required(),
  config: Joi.object().keys({
    fileEndings: Joi.string().allow('')
  })
});

const variantSchema = Joi.object().keys({
  id: Joi.string().required(),
  requirementText: Joi.string().allow(null, '').required(),
  instruction: Joi.string().allow(null, '').required(),
  useProduct: Joi.boolean().required(),
  useSpesification: Joi.boolean().required(),
  useQualification: Joi.boolean().required(),
  products: Joi.array()
    .items()
    .when('useProduct', {
      is: true,
      then: Joi.array().items(Joi.string()).min(1).required()
    })
    .required(),
  questions: Joi.array()
    .when('requirement_Type', {
      is: RequirementType.info,
      then: Joi.array()
        .items(
          Joi.alternatives().conditional('.type', {
            switch: [
              { is: QuestionEnum.Q_SLIDER, then: SliderSchema },
              { is: QuestionEnum.Q_CODELIST, then: CodelistSchema },
              { is: QuestionEnum.Q_TEXT, then: TextSchema },
              { is: QuestionEnum.Q_PERIOD_DATE, then: PeriodDateSchema },
              { is: QuestionEnum.Q_TIME, then: TimeSchema },
              { is: QuestionEnum.Q_CHECKBOX, then: CheckboxSchema },
              { is: QuestionEnum.Q_FILEUPLOAD, then: FileUploadSchema }
            ]
          })
        )
        .max(1)
    })
    .items(
      Joi.alternatives().conditional('.type', {
        switch: [
          { is: QuestionEnum.Q_SLIDER, then: SliderSchema },
          { is: QuestionEnum.Q_CODELIST, then: CodelistSchema },
          { is: QuestionEnum.Q_TEXT, then: TextSchema },
          { is: QuestionEnum.Q_PERIOD_DATE, then: PeriodDateSchema },
          { is: QuestionEnum.Q_TIME, then: TimeSchema },
          { is: QuestionEnum.Q_CHECKBOX, then: CheckboxSchema },
          { is: QuestionEnum.Q_FILEUPLOAD, then: FileUploadSchema }
        ]
      })
    )
});

const requirementSchema = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().max(100).required(),
  description: Joi.string().allow(null, '').required(),
  needId: Joi.string().required(),
  kind: Joi.string().required(),
  variants: Joi.array()
    .when('requirement_Type', {
      is: RequirementType.info,
      then: Joi.array().items(variantSchema).max(1)
    })
    .items(variantSchema)
    .required(),
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
  const dispatch = useAppDispatch();
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

  const { id } = useAppSelector((state) => state.selectedProject);
  const { list } = useAppSelector((state) => state.project);
  const { needId } = useAppSelector((state) => state.selectNeed);
  const { reqId } = useAppSelector((state) => state.selectedRequirement);

  useEffect(() => {
    async function fetchEverything() {
      await dispatch(getProjectsThunk());
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
  const { control, register, handleSubmit, formState, reset } =
    useForm<Requirement>({
      resolver: joiResolver(requirementSchema),
      defaultValues: requirement
    });

  /* useEffect(() => {
    if (requirement) {
      reset(JSON.parse(JSON.stringify(requirement)));
    }
  }, [requirement, reset]); */

  if (requirement === undefined) {
    history.push(`/workbench/${project.id}/requirement`);
    return <p> Could not find requirement </p>;
  }

  if (list.length === 0 || !needId || !reqId) {
    return <p>Loading requirement ...</p>;
  }

  const saveRequirement = async (post: Requirement) => {
    //const converted = JSON.parse(JSON.stringify(post));
    //console.log(converted);
    console.log(post);
    const oldReqIndex = Utils.ensure(
      need.requirements.findIndex((element) => element.id === reqId)
    );
    dispatch(
      editRequirementInNeed({
        projectId: project.id,
        requirement: post,
        oldNeedId: need.id,
        needId: post.needId,
        requirementIndex: oldReqIndex
      })
    );
    /* dispatch(putProjectByIdThunk(project.id)).then(() => {
      dispatch(selectNeed(converted.needId));
    }); */
  };

  const needOptions = (needList: Need[]) => {
    return needList.map((element) => {
      return (
        <option key={element.id} value={element.id}>
          {element.title}
        </option>
      );
    });
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
          control={control}
          register={register}
          formState={formState}
          project={project}
        />
        <ErrorSummary errors={errors} />
      </Form>
    </>
  );
}
