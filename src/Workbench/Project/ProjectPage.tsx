import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import formatISO from 'date-fns/formatISO';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import { BsPencil } from 'react-icons/bs';
import { useRouteMatch } from 'react-router';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store/store';
import { Publication, PublicationSchema } from '../../models/Publication';
import {
  putProjectThunk,
  addPublication,
  incrementProjectVersion,
  deletePublication,
  getProjectsThunk
} from '../../store/reducers/project-reducer';
import { postBankThunk } from '../../store/reducers/bank-reducer';
import Utils from '../../common/Utils';
import EditProjectForm from './EditProjectForm';
import SuccessAlert from '../SuccessAlert';
import { Bank } from '../../models/Bank';
import PublicationsFieldArray from './PublicationsFieldArray';
import { ProjectPublicationForm } from './ProjectPublicationForm';
import SuccessDeleteAlert from '../SuccessDeleteAlert';
import ErrorSummary from '../../Form/ErrorSummary';
import { selectProject } from '../../store/reducers/selectedProject-reducer';
import MODELTYPE from '../../models/ModelType';

interface RouteParams {
  projectId?: string;
}

function ProjectPage(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>('/workbench/:projectId');
  const { list, status } = useSelector((state: RootState) => state.project);
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const dispatch = useDispatch();

  if (projectMatch?.params.projectId) {
    dispatch(selectProject(projectMatch?.params.projectId));
  }

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

  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteAlert, setDeleteAlert] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [validated] = useState(false);
  const bakcupProject: Bank = {
    id: '',
    title: '',
    description: '',
    needs: [],
    products: [],
    codelist: [],
    version: 0,
    type: MODELTYPE.bank,
    publications: []
  };
  const project =
    status === 'fulfilled'
      ? Utils.ensure(list.find((element) => element.id === id))
      : bakcupProject;

  const projectSchema = Joi.object().keys({
    id: Joi.string().required(),
    publications: Joi.array()
      .items(PublicationSchema)
      .unique('id')
      .messages({
        'array.unique': 'Id must be unique'
      })
      .unique('version')
      .messages({
        'array.unique': 'Version must be unique'
      })
      .unique('date')
  });

  const {
    control,
    register,
    handleSubmit,
    formState
  } = useForm<ProjectPublicationForm>({
    criteriaMode: 'all',
    resolver: joiResolver(projectSchema),
    defaultValues: {
      id: project.id,
      publications: project.publications
    }
  });

  const { errors } = formState;
  const { t } = useTranslation();

  const removePublication = async (publicationId: string) => {
    dispatch(deletePublication({ projectId: project.id, publicationId }));
    await dispatch(putProjectThunk(project.id));
    setDeleteAlert(true);
  };

  if (list.length === 0 || !id) {
    return <p>Loading project page ...</p>;
  }
  const publishProject = async (e: any) => {
    // Publication is always first in array because we prepend
    const publication: Publication = e.publications[0];

    const projectToBePublished: Bank = { ...project };

    /* Date from form is may have been stale (i.e waiting before clicking), update to now */
    const convertedDate = formatISO(new Date());
    projectToBePublished.publishedDate = convertedDate;
    projectToBePublished.id = '';
    projectToBePublished.publications = [];
    projectToBePublished.version = publication.version;

    // TODO: fix this any and figure out why we must use await
    const result: any = await dispatch(postBankThunk(projectToBePublished));

    // update root project with new values
    publication.bankId = result.payload.id;
    publication.date = convertedDate;

    dispatch(addPublication({ projectId: project.id, publication }));
    dispatch(incrementProjectVersion(project.id));
    await dispatch(putProjectThunk(project.id));
    setShowAlert(true);
  };

  function editProjectForm(edit: boolean) {
    if (edit) {
      return <EditProjectForm toggleShow={setEditMode} project={project} />;
    }
    return <></>;
  }

  return (
    <>
      <Row className="ml-1 mt-3">
        <h3> {project.title} </h3>
        <Button className="ml-3" onClick={() => setEditMode(true)}>
          <BsPencil />
        </Button>
      </Row>
      <h6 className="ml-1 mb-3">{project.description}</h6>
      {editProjectForm(editMode)}
      <h4>{t('publications')}</h4>
      {showDeleteAlert && (
        <SuccessDeleteAlert
          toggleShow={setDeleteAlert}
          text="Publication was deleted"
        />
      )}
      {showAlert && (
        <SuccessAlert toggleShow={setShowAlert} type="publication" />
      )}
      <Form
        onSubmit={handleSubmit((e) => publishProject(e))}
        noValidate
        validated={validated}
      >
        <Form.Control readOnly type="hidden" as="input" {...register('id')} />
        <PublicationsFieldArray
          control={control}
          register={register}
          formState={formState}
          projectId={project.id}
          removePublication={removePublication}
        />
        <ErrorSummary errors={errors} />
      </Form>
    </>
  );
}

export default ProjectPage;
